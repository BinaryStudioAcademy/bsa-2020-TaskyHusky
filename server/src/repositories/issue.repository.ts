import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
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
};

export interface CreateIssueArgs {
	type: string;
	priority: string;
	project: string;
	summary: string;
	labels?: string[];
	links?: string[];
	attachments?: string;
	description?: string;
}

@EntityRepository(Issue)
export class IssueRepository extends Repository<Issue> {
	findAll() {
		return this.find({ relations: RELS });
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
		const lastIndex = issues.reduce((acc, current) => (acc = Math.max(acc, e(current.issueKey as string))), 0);
		const newKey = `${key}-${lastIndex + 1}`;
		const entity = this.create({ ...data, issueKey: newKey } as any);
		const result = ((await this.save(entity)) as unknown) as Issue;
		if (data.labels) await this.createQueryBuilder().relation(Issue, 'labels').of(result.id).add(data.labels);
		const newIssue = await this.findOneById(result.id);
		issueHandler.emit(IssueActions.CreateIssue, newIssue);

		return result;
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
		await this.save({ ...(data as any), id });
		if (data.labels) await this.createQueryBuilder().relation(Issue, 'labels').of(id).add(data.labels);
		const newIssue = await this.findOneById(id);
		issueHandler.emit(IssueActions.UpdateIssue, id, newIssue);
		this.notify(partialIssue, data, newIssue, senderId);

		return newIssue;
	}

	async updateOneByKey(key: string, data: PartialIssue, senderId: string) {
		const partialIssue = await this.findByKeyWithRelIds(key);
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
