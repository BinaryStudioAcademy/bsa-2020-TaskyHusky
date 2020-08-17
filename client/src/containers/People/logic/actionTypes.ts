export const START_LOADING = 'PEOPLE_PAGE:START_LOADING';
export const SUCCESS_LOADING = 'PEOPLE_PAGE:SUCCESS_LOADING';

export type SuccessLoading = {
	people: WebApi.Entities.UserProfile[];
	teams: WebApi.Entities.Team[];
};
