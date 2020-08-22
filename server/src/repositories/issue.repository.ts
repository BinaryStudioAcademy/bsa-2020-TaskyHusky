import { EntityRepository, Repository } from 'typeorm';
import { Issue } from '../entity/Issue';
import { getConditions } from '../helpers/issue.helper';

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

	updateOneById(id: string, data: Partial<Issue>) {
		return this.update(id, data);
	}

	updateOneByKey(key: string, data: Partial<Issue>) {
		return this.update({ issueKey: key }, data);
	}

	deleteOneById(id: string) {
		return this.delete(id);
	}
}
