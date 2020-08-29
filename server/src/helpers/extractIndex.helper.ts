export const extractIndexFromIssueKey = (issueKey: string) => {
	const indexStr = issueKey.split('-')[1];
	return Number(indexStr);
};
