import { IssuesToSprint } from '../logic/state';

export const updateMatchIssuesToSprint = (
	matchIssuesToSprint: IssuesToSprint,
	updatedIssue: WebApi.Result.IssueResult,
): IssuesToSprint => {
	const entries = Object.entries(matchIssuesToSprint);
	const updatedEntries = entries.map(([sprintId, issues]) => {
		if (sprintId === updatedIssue.sprint?.id) {
			return [sprintId, issues.concat({ ...updatedIssue })];
		}
		return [sprintId, issues.filter((oldIssue) => oldIssue.id !== updatedIssue.id)];
	});
	const newMatchIssuesToSprint = Object.fromEntries(updatedEntries);
	return newMatchIssuesToSprint;
};

export const updateBackLog = (backlog: WebApi.Result.IssueResult[], updatedIssue: WebApi.Result.IssueResult) => {
	return updatedIssue.sprint?.id
		? backlog.filter((issue) => issue.id !== updatedIssue.id)
		: backlog.concat({ ...updatedIssue });
};
