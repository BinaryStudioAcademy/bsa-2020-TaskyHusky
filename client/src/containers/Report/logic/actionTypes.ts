export const LOAD_SPRINT = 'REPORT:LOAD_SPRINT';
export const LOAD_SPRINT_SUCCESS = 'REPORT:LOAD_SPRINT_SUCCESS';

export type LoadSprintById = {
	id: string;
};

export type LoadSprintByIdSuccess = {
	sprint: WebApi.Entities.Sprint;
};
