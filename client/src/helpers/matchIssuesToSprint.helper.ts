import { isEmpty } from 'lodash-es';
import memoizeOne from 'memoize-one';

const matchIssuesToSprint = (
	sprints: WebApi.Entities.Sprint[],
	issues: WebApi.Entities.Issue[],
): { [sprintId: string]: WebApi.Entities.Issue[] } => {
	const issuesToSprint: { [sprintId: string]: WebApi.Entities.Issue[] } = { backlog: [] };

	if (!isEmpty(sprints) || !isEmpty(issues)) {
		sprints.forEach((sprint) => (issuesToSprint[sprint.id] = []));

		issues.forEach((issue) => {
			if (!!issue.sprint?.id && !!issuesToSprint[issue.sprint.id]) {
				issuesToSprint[issue.sprint.id].push(issue);
			} else {
				issuesToSprint['backlog'].push(issue);
			}
		});
	}

	return issuesToSprint;
};

const memoizedMatchIssuesToSprint = memoizeOne(matchIssuesToSprint);

export default memoizedMatchIssuesToSprint;
