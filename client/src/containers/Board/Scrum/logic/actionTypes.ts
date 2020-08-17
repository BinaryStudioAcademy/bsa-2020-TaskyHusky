export const LOAD_SPRINTS_TRIGGER = 'SCRUM_BOARD:LOAD_SPRINTS_TRIGGER';
export const LOAD_SPRINTS_SUCCESS = 'SCRUM_BOARD:LOAD_SPRINTS_SUCCESS';

export type loadSprintsTrigger = {
	boardId: string;
};

export type loadSprintsSuccess = {
	sprints: WebApi.Entities.Sprint[];
};

export const DELETE_SPRINT_TRIGGER = 'SCRUM_BOARD:DELETE_SPRINT_TRIGGER';

export type deleteSprintTrigger = {
	sprintId: string;
};
