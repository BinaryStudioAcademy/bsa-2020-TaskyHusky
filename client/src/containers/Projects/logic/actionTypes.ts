export const START_LOADING = 'PROJECTS:START_LOADING';
export const SUCCESS_LOADING = 'PROJECTS:SUCCESS_LOADING';
export const FAIL_LOADING = 'PROJECTS:FAIL_LOADING';

export const UPDATE_PROJECTS_LIST = 'PROJECTS:UPDATE_PROJECTS_LIST';

export type ProjectsList = {
	projects: WebApi.Entities.Projects[];
};
