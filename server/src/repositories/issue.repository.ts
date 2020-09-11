import { EntityRepository, Repository, getCustomRepository, getRepository } from 'typeorm';
import _ from 'lodash';
import { Issue } from '../entity/Issue';
import { getConditions } from '../helpers/issue.helper';
import { NotificationRepository } from './notification.repository';
import { PartialIssue } from '../models/Issue';
import { chooseMessage } from '../AI/selectUpdateIssueWatchNotificationMessage.ai';
import issueHandler from '../socketConnectionHandlers/issue.handler';
import { IssueActions } from '../models/IO';
import { getDiffPropNames } from '../helpers/objectsDiff.helper';
import { ProjectsRepository } from './projects.repository';
import { Projects } from '../entity/Projects';
import { extractIndexFromIssueKey } from '../helpers/extractIndex.helper';
import { BoardColumnRepository } from './boardColumn.repository';
import { IssueStatus } from '../entity/IssueStatus';
import { stat } from 'fs';

const RELS = [
	'priority',
	'type',
	'creator',
	'assigned',
	'status',
	'sprint',
	'project',
	'boardColumn',
	'watchers',
	'board',
	'labels',
];

type SortDir = 'DESC' | 'ASC';

type Sort = {
	summary?: SortDir;
	assigned?: SortDir;
	creator?: SortDir;
	type?: SortDir;
	priority?: SortDir;
	status?: SortDir;
	issueKey?: SortDir;
	createdAt?: SortDir;
	updatedAt?: SortDir;
};

export type Filter = {
	id?: string[];
	issueType?: string[];
	priority?: string[];
	sprint?: string[];
	projects?: string[];
	issueStatus?: string[];
	assigned?: string[];
	creator?: string[];
	summary?: string;
	description?: string;
	sprintId?: string;
};

export interface CreateIssueArgs {
	type: string;
	priority: string;
	project: string;
	summary: string;
	labels?: string[];
	links?: string[];
	boardColumn?: string;
	attachments?: string;
	description?: string;
}

type WhereConditions = {
	sprint: string;
};
@EntityRepository(Issue)
export class IssueRepository extends Repository<Issue> {
	async findAll(filter?: Filter) {
		const where = {} as WhereConditions;
		if (filter && filter.sprintId) {
			where.sprint = filter.sprintId;
		}
		return (await this.find({ relations: RELS, where })).map((issue) => ({
			id: issue.id,
			index: issue.index,
			column: issue.boardColumn?.columnName,
			columnId: issue.boardColumn?.id,
		}));
	}

	getFilteredIssues(filter: Filter | undefined, from: number, to: number, sort: Sort) {
		const where = filter ? getConditions(filter) : {};

		return this.findAndCount({
			relations: RELS,
			where,
			skip: from,
			take: to - from,
			order: sort,
		});
	}

	findAllByColumnId(id: string) {
		return this.find({ relations: RELS, where: { boardColumn: { id } } });
	}

	findAllByProjectId(id: string) {
		return this.find({ relations: RELS, where: { project: { id } } });
	}

	findAllByBoardId(id: string): Promise<Issue[]> {
		return this.find({ relations: RELS, where: { board: { id } } });
	}

	findOneById(id: string) {
		return this.findOneOrFail({ where: { id }, relations: RELS });
	}

	findByIdWithRelIds(id: string): Promise<PartialIssue> {
		return this.findOneOrFail({ where: { id }, loadRelationIds: { relations: RELS } }) as Promise<any>;
	}

	findByKeyWithRelIds(key: string): Promise<PartialIssue> {
		return this.findOneOrFail({ where: { issueKey: key }, loadRelationIds: { relations: RELS } }) as Promise<any>;
	}

	findOneByKey(key: string) {
		return this.findOneOrFail({ where: { issueKey: key }, relations: RELS });
	}

	async createOne(data: CreateIssueArgs) {
		const { project } = data;
		const projectRepository = getCustomRepository(ProjectsRepository);
		const { key, issues = [] } = (await projectRepository.getWithIssuesById(project)) as Projects;
		const e = extractIndexFromIssueKey;
		// eslint-disable-next-line
		const lastKeyIndex = issues.reduce((acc, current) => Math.max(acc, e(current.issueKey as string)), 0);
		let index: number | undefined;

		if (data.boardColumn) {
			const columnIssues = await this.findAllByColumnId(data.boardColumn);
			index = columnIssues.reduce((acc, current) => Math.max(acc, current.index ?? 0), -1) + 1;
		}

		const newKey = `${key}-${lastKeyIndex + 1}`;
		const entity = this.create({ ...data, issueKey: newKey, index } as any);
		const result = ((await this.save(entity)) as unknown) as Issue;

		if (data.labels) {
			await this.createQueryBuilder().relation(Issue, 'labels').of(result.id).add(data.labels);
		}

		const newIssue = await this.findOneById(result.id);
		issueHandler.emit(IssueActions.CreateIssue, newIssue);

		return newIssue;
	}

	async watch(id: string, userId: string) {
		const { watchers = [] }: Issue = await this.findOneById(id);
		const qBuilder = this.createQueryBuilder().relation(Issue, 'watchers').of(id);
		const promise = watchers.some((user) => user.id === userId) ? qBuilder.remove(userId) : qBuilder.add(userId);
		const result = await promise;
		const newIssue = await this.findOneById(id);
		issueHandler.emit(IssueActions.UpdateIssue, id, newIssue);

		return result;
	}

	async reindex(movedKey: string, newIndex: number, newColumn?: string) {
		const issue = await this.findOneByKey(movedKey);
		await this.updateOneByKey(movedKey, { boardColumn: newColumn }, '');

		if (newColumn && newColumn !== issue.boardColumn?.id) {
			const boardColumn = await getCustomRepository(BoardColumnRepository).getOne(newColumn);

			if (boardColumn && boardColumn.isResolutionSet) {
				const completedAt = new Date();
				const status = (await getRepository(IssueStatus).findOne({ title: 'Done' })) as IssueStatus;
				await this.updateOneByKey(movedKey, { completedAt, status: status.id }, '');
			}

			const columnIssues = await this.findAllByColumnId(boardColumn.id);

			await Promise.all(
				columnIssues
					.filter((filterIssue) => (filterIssue.index as number) >= (issue.index as number))
					.map((mapIssue) => this.updateOneByKey(movedKey, { index: mapIssue.index + 1 }, '')),
			);
		}

		if (issue.index === undefined || issue.boardColumn === undefined)
			throw new Error('Issue is not in board column');

		// Imagine kanban board's column: if new index is greater than prevoius index, issue was moved down
		const movedDown = newIndex > issue.index;
		const columnIssues = await this.findAllByColumnId(issue.boardColumn.id);

		const condition = movedDown
			? (filteringIssue: Issue) =>
					(filteringIssue.index as number) > issue.index && (filteringIssue.index as number) <= newIndex
			: (filteringIssue: Issue) =>
					(filteringIssue.index as number) < issue.index && (filteringIssue.index as number) >= newIndex;

		const diff = movedDown ? -1 : 1;

		await Promise.all(
			columnIssues
				.filter(condition)
				.map((mapIssue) => this.update(mapIssue.id, { index: (mapIssue.index as number) + diff }, '')),
		);

		await this.updateOneByKey(movedKey, { index: newIndex }, '');
	}

	notify(partialIssue: PartialIssue, data: PartialIssue, issue: Issue, senderId: string) {
		const notification = getCustomRepository(NotificationRepository);
		const difference = getDiffPropNames<any, any>(partialIssue, { ...partialIssue, ...data }, _.isEqual);

		if (difference.length) {
			notification.notifyIssueWatchers({
				issue,
				senderId,
				actionOrText: chooseMessage(partialIssue, { ...partialIssue, ...data }),
				customText: true,
			});
		}
	}

	async updateOneById(id: string, data: PartialIssue, senderId: string) {
		const partialIssue = await this.findByIdWithRelIds(id);
		let index: number | undefined;

		if (data.boardColumn && !partialIssue.boardColumn) {
			const columnIssues = await this.findAllByColumnId(data.boardColumn);
			index = columnIssues.reduce((acc, current) => Math.max(acc, current.index ?? 0), -1) + 1;
		}

		await this.save({ ...({ ...data, index } as any), id });

		if (data.labels) {
			await this.createQueryBuilder().relation(Issue, 'labels').of(id).add(data.labels);
		}

		const newIssue = await this.findOneById(id);
		issueHandler.emit(IssueActions.UpdateIssue, id, newIssue);
		this.notify(partialIssue, data, newIssue, senderId);

		return newIssue;
	}

	async updateOneByKey(key: string, givenData: PartialIssue, senderId: string) {
		const partialIssue = await this.findByKeyWithRelIds(key);
		const { watchers, labels, ...data } = givenData;

		const boardColumn = givenData.boardColumn
			? await getCustomRepository(BoardColumnRepository).getOne(givenData.boardColumn)
			: undefined;

		if (boardColumn && boardColumn.isResolutionSet) {
			const completedAt = new Date();
			data.completedAt = completedAt;
			data.status = ((await getRepository(IssueStatus).findOne({ title: 'Done' })) as IssueStatus).id;
		} else if (boardColumn && !boardColumn.isResolutionSet) {
			data.completedAt = undefined;
		}

		await this.update({ issueKey: key }, data as any);
		const newIssue = await this.findOneByKey(key);
		issueHandler.emit(IssueActions.UpdateIssue, newIssue.id, newIssue);
		this.notify(partialIssue, data, newIssue, senderId);

		return newIssue;
	}

	async deleteOneById(id: string, senderId: string) {
		const issue = await this.findOneById(id);
		const notification = getCustomRepository(NotificationRepository);
		issueHandler.emit(IssueActions.DeleteIssue, id);
		notification.notifyIssueWatchers({ issue, actionOrText: 'deleted', noLink: true, senderId });

		const result = await this.delete(id);
		return result;
	}
}
