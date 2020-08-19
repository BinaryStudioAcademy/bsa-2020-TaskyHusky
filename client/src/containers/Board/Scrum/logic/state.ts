type issuesToSprint = {
	[sprintId: string]: WebApi.Entities.Issue[];
};

type EntityObject = {
	[key: string]: any;
};

export interface ScrumBoardState {
	sprints: WebApi.Entities.Sprint[];
	matchIssueToSprint: issuesToSprint;
	project: EntityObject;
	board: EntityObject;
}

export const initialState: ScrumBoardState = {
	sprints: [],
	matchIssueToSprint: {},
	project: {},
	board: {},
};
