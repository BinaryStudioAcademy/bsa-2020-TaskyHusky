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
