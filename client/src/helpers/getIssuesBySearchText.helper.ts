import memoizeOne from 'memoize-one';

export type GetIssuesForSprint = {
	(searchString: string, issues: WebApi.Entities.Issue[] | undefined): WebApi.Entities.Issue[];
};

const getIssuesForSprint: GetIssuesForSprint = (searchString, issues) => {
	return issues ? issues.filter((issue) => issue.summary?.toLowerCase().includes(searchString)) : [];
};

const memoizedGetIssuesForSprint = memoizeOne(getIssuesForSprint);

export default memoizedGetIssuesForSprint;
