import * as _ from 'lodash';
import moment from 'moment';

export type CompletedIssues = {
	id: string;
	summary?: string;
	storyPoint?: number;
	createdAt: Date;
	updatedAt: Date;
	completedAt: Date;
};

export const getSortedCompletedIssues = (issues: WebApi.Result.IssueResult[]) => {
	return _.orderBy(issues, 'completedAt').filter(({ completedAt }) => completedAt) as CompletedIssues[];
};

export const getEndDate = (issues: CompletedIssues[], sprintEnd: Date) => {
	if (issues.length !== 0) {
		const lastCompletedIssue = issues[issues.length - 1];
		const end =
			lastCompletedIssue.completedAt > new Date(sprintEnd)
				? lastCompletedIssue.completedAt
				: new Date(moment(new Date(sprintEnd)).startOf('day').format());
		return end;
	}
	return new Date(moment(new Date(sprintEnd)).startOf('day').format());
};

export const getStartOfDayDate = (date: Date) => {
	return new Date(moment(new Date(date)).startOf('day').format());
};
