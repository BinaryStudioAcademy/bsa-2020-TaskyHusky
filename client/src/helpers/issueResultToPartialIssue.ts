export const convertIssueResultToPartialIssue = (
	issueToConvert: WebApi.Result.IssueResult,
	custom: WebApi.Issue.PartialIssue = {},
): WebApi.Issue.PartialIssue => {
	return {
		...issueToConvert,
		type: issueToConvert.type.id,
		priority: issueToConvert.priority.id,
		project: issueToConvert.project?.id,
		sprint: issueToConvert.sprint?.id,
		status: issueToConvert.status?.id,
		board: issueToConvert.board?.id,
		boardColumn: issueToConvert.boardColumn?.id,
		creator: issueToConvert.creator.id,
		assigned: issueToConvert.assigned?.id,
		labels: issueToConvert.labels?.map((l) => l.id),
		...custom,
	};
};
