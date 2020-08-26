import memoizeOne from 'memoize-one';

export type GetIssuesForSprint = {
	(searchString: string, issues: WebApi.Entities.Issue[]): WebApi.Entities.Issue[];
};

const getIssuesForSprint: GetIssuesForSprint = (searchString, issues) => {
	return !!issues?.length ? issues.filter((issue) => issue.summary?.toLowerCase().includes(searchString)) : [];
};

const memoizedGetIssuesForSprint = memoizeOne(getIssuesForSprint);

export default memoizedGetIssuesForSprint;
