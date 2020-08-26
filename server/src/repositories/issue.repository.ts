import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { Issue } from '../entity/Issue';
import { getConditions } from '../helpers/issue.helper';
import { NotificationRepository } from './notification.repository';
import { PartialIssue } from '../models/Issue';
import { chooseMessage } from '../AI/selectUpdateIssueWatchNotificationMessage.ai';
import issueHandler from '../socketConnectionHandlers/issue.handler';
import { IssueActions } from '../models/IO';

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
	comment?: string;
};

@EntityRepository(Issue)
export class IssueRepository extends Repository<Issue> {
	findAll() {
		return this.find({ relations: RELS });
	}

	getFilteredIssues(filter: Filter | undefined, from: number, to: number, sort: Sort) {
		const where = filter ? getConditions(filter) : {};
		return this.findAndCount({ relations: RELS, where, skip: from, take: to - from, order: sort });
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

	findOneByKey(key: string) {
		return this.findOneOrFail({ where: { issueKey: key }, relations: RELS });
	}

	async createOne(data: Issue) {
		const entity = this.create(data);
		const result = await this.save(entity);
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

	async updateOneById(id: string, data: PartialIssue) {
		const issue = await this.findOneById(id);
		const partialIssue = await this.findByIdWithRelIds(id);
		const notification = getCustomRepository(NotificationRepository);
		const result = await this.update(id, data as any);
		const newIssue = await this.findOneById(id);
		issueHandler.emit(IssueActions.UpdateIssue, id, newIssue);

		notification.notifyIssueWatchers({
			issue,
			actionOrText: chooseMessage(partialIssue, { ...partialIssue, ...data }),
			customText: true,
		});

		return result;
	}

	async updateOneByKey(key: string, data: Issue) {
		const result = await this.update({ issueKey: key }, data);
		const newIssue = await this.findOneByKey(key);
		issueHandler.emit(IssueActions.UpdateIssue, newIssue.id, newIssue);
		return result;
	}

	async deleteOneById(id: string) {
		const issue = await this.findOneById(id);
		const notification = getCustomRepository(NotificationRepository);
		issueHandler.emit(IssueActions.DeleteIssue, id);
		notification.notifyIssueWatchers({ issue, actionOrText: 'deleted', noLink: true });

		const result = await this.delete(id);
		return result;
	}
}
