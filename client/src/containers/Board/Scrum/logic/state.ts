type issuesToSprint = {
	[sprintId: string]: WebApi.Entities.Issue[];
};

export interface ScrumBoardState {
	sprints: WebApi.Entities.Sprint[];
	matchIssueToSprint: issuesToSprint;
}

export const initialState: ScrumBoardState = {
	sprints: [],
	matchIssueToSprint: {},
};
