import { FindOperator, Any, Like } from 'typeorm';
import { Filter } from '../repositories/issue.repository';

type RequestConditions = {
	id: FindOperator<string>;
	type?: FindOperator<string>;
	priority?: FindOperator<string>;
	summary?: FindOperator<string>;
	description?: FindOperator<string>;
	sprint?: FindOperator<string>;
	project?: FindOperator<string>;
	status?: FindOperator<string>;
	assigned?: FindOperator<string>;
	creator?: FindOperator<string>;
};

const getLikeOperator = (matchValue: string) => {
	return Like(`%${matchValue}%`);
};

export const getConditions = (filter: Filter) => {
	const where = {} as RequestConditions;
	const { id, issueType, issueStatus, priority, summary, description, sprint, projects, assigned, creator } = filter;

	if (id) {
		where.id = Any(id);
	}
	if (issueType) {
		where.type = Any(issueType);
	}
	if (issueStatus) {
		where.status = Any(issueStatus);
	}
	if (priority) {
		where.priority = Any(priority);
	}
	if (sprint) {
		where.sprint = Any(sprint);
	}
	if (projects) {
		where.project = Any(projects);
	}
	if (assigned) {
		where.assigned = Any(assigned);
	}
	if (creator) {
		where.creator = Any(creator);
	}
	if (summary) {
		where.summary = getLikeOperator(summary);
	}
	if (description) {
		where.description = getLikeOperator(description);
	}

	return where;
};
