import { EntityRepository, Repository, Like, FindOperator, Any, In, Raw } from 'typeorm';
import { Projects } from '../entity/Projects';
import { Sprint } from '../entity/Sprint';
import { Priority } from '../entity/Priority';
import { Issue } from '../entity/Issue';
import { IssueType } from '../entity/IssueType';

const RELS = ['priority', 'type'];

type Filter = {
	typeIds?: string[];
	priorityIds?: string[];
	summaries?: string[];
	descriptions?: string[];
	sprintIds?: string[];
	projectIds?: string[];
};

type RequestConditions = {
	type?: FindOperator<string>;
	priority?: FindOperator<string>;
	summary?: FindOperator<string>;
	description?: FindOperator<string>;
	sprint?: FindOperator<string>;
	project?: FindOperator<string>;
};

const mapStrToRawLike = (alias: string, matchValue: string) => {
	return `(${alias} like '%${matchValue}%')`;
};

const getConditions = (filter: Filter) => {
	const where = {} as RequestConditions;
	const { typeIds, priorityIds, summaries, descriptions, sprintIds, projectIds } = filter;

	if (typeIds) {
		where.type = Any(typeIds);
	}
	if (priorityIds) {
		where.priority = Any(priorityIds);
	}
	if (sprintIds) {
		where.sprint = Any(sprintIds);
	}
	if (projectIds) {
		where.project = Any(projectIds);
	}
	if (summaries) {
		where.summary = Raw((alias) => summaries.map((value) => mapStrToRawLike(alias as string, value)).join(' OR '));
	}
	if (descriptions) {
		where.description = Raw((alias) =>
			descriptions.map((value) => mapStrToRawLike(alias as string, value)).join(' OR '),
		);
	}

	return where;
};

@EntityRepository(Issue)
export class IssueRepository extends Repository<Issue> {
	findAll(filter: Filter | undefined) {
		const where = filter ? getConditions(filter) : {};

		return this.find({ relations: RELS, where });
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

	deleteOneById(id: string) {
		return this.delete(id);
	}
}
