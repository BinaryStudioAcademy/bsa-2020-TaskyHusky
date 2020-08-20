import { EntityRepository, Repository } from 'typeorm';
import { Issue } from '../entity/Issue';
import { getConditions } from '../helpers/issue.helper';

const RELS = ['priority', 'type', 'creator', 'assigned', 'status'];

type Sort = {
	summary?: 'DESC' | 'ASC' | undefined;
	assigned?: 'DESC' | 'ASC' | undefined;
	creator?: 'DESC' | 'ASC' | undefined;
	type?: 'DESC' | 'ASC' | undefined;
	priority?: 'DESC' | 'ASC' | undefined;
	status?: 'DESC' | 'ASC' | undefined;
	issueKey?: 'DESC' | 'ASC' | undefined;
	createdAt?: 'DESC' | 'ASC' | undefined;
	updatedAt?: 'DESC' | 'ASC' | undefined;
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
		console.log('\n\n\n\n\n\n\n\n', from, to, sort);

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

	updateOneById(id: string, data: Issue) {
		return this.update(id, data);
	}

	updateOneByKey(key: string, data: Issue) {
		return this.update({ issueKey: key }, data);
	}

	deleteOneById(id: string) {
		return this.delete(id);
	}
}
