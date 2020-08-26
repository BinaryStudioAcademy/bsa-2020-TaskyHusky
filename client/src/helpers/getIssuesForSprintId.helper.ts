import { normalizeText } from './normalizeText.helper';
import { IssuesToSprint } from 'containers/Board/Scrum/logic/state';
import memoizeOne from 'memoize-one';

export type GetIssuesForSprintId = {
	(searchString: string, matchIssuesToSprintIdObject: IssuesToSprint, sprintId: string): WebApi.Entities.Issue[];
};

const getIssuesForSprintId: GetIssuesForSprintId = (searchString, matchIssuesToSprintIdObject, sprintId) => {
	const entries = Object.entries(matchIssuesToSprintIdObject);
	const filteredEntries = entries.map(([sprintId, issues]) => [
		sprintId,
		issues.filter((issue) => issue.summary?.toLowerCase().includes(normalizeText(searchString))),
	]);
	const newMatchIssuesToSprintIdObject = Object.fromEntries(filteredEntries);
	return newMatchIssuesToSprintIdObject[sprintId];
};

const memoizedGetIssuesForSprintId = memoizeOne(getIssuesForSprintId);

export default memoizedGetIssuesForSprintId;
