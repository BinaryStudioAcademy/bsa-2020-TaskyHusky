import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { Issue } from '../entity/Issue';
import { getConditions } from '../helpers/issue.helper';
import { NotificationRepository } from './notification.repository';

const RELS = ['priority', 'type', 'creator', 'assigned', 'status', 'watchers'];
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
	findAll(from: number, to: number) {
		return this.find({ relations: RELS, skip: from, take: to - from });
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

	findOneById(id: string) {
		return this.findOneOrFail({ where: { id }, relations: RELS });
	}

	findOneByKey(key: string) {
		return this.findOneOrFail({ where: { issueKey: key }, relations: RELS });
	}

	createOne(data: Issue) {
		const entity = this.create(data);
		return this.save(entity);
	}

	async watch(id: string, userId: string) {
		const { watchers = [] }: Issue = await this.findOneById(id);
		const qBuilder = this.createQueryBuilder().relation(Issue, 'watchers').of(id);
		const promise = watchers.some((user) => user.id === userId) ? qBuilder.remove(userId) : qBuilder.add(userId);
		return await promise;
	}

	async updateOneById(id: string, data: Issue) {
		const issue = await this.findOneById(id);
		const notification = getCustomRepository(NotificationRepository);
		notification.notifyIssueWatchers(issue, 'updated');

		return await this.update(id, data);
	}

	updateOneByKey(key: string, data: Issue) {
		return this.update({ issueKey: key }, data);
	}

	async deleteOneById(id: string) {
		const issue = await this.findOneById(id);
		const notification = getCustomRepository(NotificationRepository);
		notification.notifyIssueWatchers(issue, 'deleted', true);

		//return await this.delete(id);
		return {};
	}
}
