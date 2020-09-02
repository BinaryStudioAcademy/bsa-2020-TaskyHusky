export interface UserActivityState {
	assignedIssues: Array<ActivityIssue>;
	recentActivity: Array<ActivityIssue>;
	isLoading: boolean;
}

export const initialState: UserActivityState = {
	assignedIssues: [],
	recentActivity: [],
	isLoading: true,
};

export type ActivityIssue = {
	issueKey: string;
	id: string;
	summary: string;
	priority: WebApi.Entities.Priority;
	updatedAt: Date;
	type: WebApi.Entities.IssueType;
	project: {
		id: string;
		name: string;
		category: string;
		users: Array<{ id: string }>;
	};
};
