export const LOAD_SPRINTS_TRIGGER = 'SCRUM_BOARD:LOAD_SPRINTS_TRIGGER';
export const LOAD_SPRINTS_SUCCESS = 'SCRUM_BOARD:LOAD_SPRINTS_SUCCESS';

export type LoadSprintsTrigger = {
	boardId: string;
};

export type LoadSprintsSuccess = {
	sprints: WebApi.Entities.Sprint[];
};

export const DELETE_SPRINT_TRIGGER = 'SCRUM_BOARD:DELETE_SPRINT_TRIGGER';

export type DeleteSprintTrigger = {
	sprintId: string;
};

export const LOAD_ISSUES_TRIGGER = 'SCRUM_BOARD:LOAD_ISSUES_TRIGGER';
export const LOAD_ISSUES_SUCCESS = 'SCRUM_BOARD:LOAD_ISSUES_SUCCESS';

export type LoadIssuesTrigger = {
	sprintId: string;
};

export type LoadIssuesSuccess = {
	issues: WebApi.Entities.Issue[];
	sprintId: string;
};

export const UPDATE_SPRINT_DATA_TRIGGER = 'SCRUM_BOARD:UPDATE_SPRINT_DATA_TRIGGER';
export const UPDATE_SPRINT_DATA_SUCCESS = 'SCRUM_BOARD:UPDATE_SPRINT_DATA_SUCCESS';

export type UpdateSprintDataTrigger = {
	sprint: Partial<WebApi.Entities.Sprint>;
};

export type UpdateSprintDataSuccess = {
	sprint: WebApi.Entities.Sprint;
};

export const CREATE_SPRINT_TRIGGER = 'SCRUM_BOARD:CREATE_SPRINT_TRIGGER';
export const CREATE_SPRINT_SUCCESS = 'SCRUM_BOARD:CREATE_SPRINT_SUCCESS';

export type CreateSprintTrigger = {
	sprint: Partial<WebApi.Sprint.SprintModel>;
};

export type CreateSprintSuccess = {
	sprint: WebApi.Entities.Sprint;
};

export const SAVE_BOARD_TO_STATE = 'SCRUM_BOARD:SAVE_BOARD_TO_STATE';

export type SaveBoardToState = {
	board: WebApi.Result.ComposedBoardResult;
};

export const LOAD_PROJECT_TRIGGER = 'SCRUM_BOARD:LOAD_PROJECT_TRIGGER';
export const LOAD_PROJECT_SUCCESS = 'SCRUM_BOARD:LOAD_PROJECT_SUCCESS';

export type LoadProjectTrigger = {
	boardId: string;
};

export type LoadProjectSuccess = {
	project: WebApi.Entities.Projects;
};
