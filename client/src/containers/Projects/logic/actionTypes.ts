export const START_LOADING = 'PROJECTS:START_LOADING';
export const SUCCESS_LOADING = 'PROJECTS:SUCCESS_LOADING';
export const FAIL_LOADING = 'PROJECTS:FAIL_LOADING';

export type SuccessLoading = {
	projects: WebApi.Entities.Projects[];
};
