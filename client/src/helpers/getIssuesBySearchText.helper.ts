import memoizeOne from 'memoize-one';

export type GetIssuesForSprint = {
	(searchString: string, issues: WebApi.Result.IssueResult[] | undefined): WebApi.Result.IssueResult[];
};

const getIssuesForSprint: GetIssuesForSprint = (searchString, issues) => {
	return issues ? issues.filter((issue) => issue.summary?.toLowerCase().includes(searchString)) : [];
};

const memoizedGetIssuesForSprint = memoizeOne(getIssuesForSprint);

export default memoizedGetIssuesForSprint;
