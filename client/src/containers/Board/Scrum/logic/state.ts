type issuesToSprint = {
	[sprintId: string]: WebApi.Entities.Issue[];
};

export interface ScrumBoardState {
	sprints: WebApi.Entities.Sprint[];
	matchIssueToSprint: issuesToSprint;
	matchIssueToSprintShallowCopy: issuesToSprint;
	projectId: string;
	boardId: string;
}

export const initialState: ScrumBoardState = {
	sprints: [],
	matchIssueToSprint: {},
	matchIssueToSprintShallowCopy: {},
	projectId: '',
	boardId: '',
};
