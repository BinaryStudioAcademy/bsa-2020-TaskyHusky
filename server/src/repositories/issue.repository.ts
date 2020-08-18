import { EntityRepository, Repository, FindOperator, Any, Raw } from 'typeorm';
import { Issue } from '../entity/Issue';
import { getConditions } from '../helpers/issue.helper';

const RELS = ['priority', 'type', 'creator', 'assigned', 'status'];

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
	findAll() {
		return this.find({ relations: RELS });
	}

	getFilteredIssues(filter: Filter | undefined) {
		const where = filter ? getConditions(filter) : {};

		return this.find({ relations: RELS, where });
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
