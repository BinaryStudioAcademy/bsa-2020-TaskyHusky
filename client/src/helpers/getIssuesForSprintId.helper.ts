import { normalizeText } from './normalizeText.helper';
import { issuesToSprint } from 'containers/Board/Scrum/logic/state';

export type GetIssuesForSprintId = {
	(searchString: string, matchIssueToSprint: issuesToSprint, sprintId: string): WebApi.Entities.Issue[];
};

/**
 * @param searchString string based on which the search will be performed
 * @param matchIssueToSprint object of matching Issue[] to sprint id
 * @param sprintId sprint id to search issues for
 * @returns Issue[] for sprint id
 */

export const getIssuesForSprintId: GetIssuesForSprintId = (searchString, matchIssueToSprint, sprintId) => {
	if (!normalizeText(searchString)) {
		return matchIssueToSprint[sprintId];
	}

	const entries = Object.entries(matchIssueToSprint);
	const filteredEntries = entries.map(([sprintId, issues]) => [
		sprintId,
		issues.filter((issue) => issue.summary?.toLowerCase().includes(normalizeText(searchString))),
	]);
	const newMatchIssuesToSprint = Object.fromEntries(filteredEntries);
	return newMatchIssuesToSprint[sprintId];
};
