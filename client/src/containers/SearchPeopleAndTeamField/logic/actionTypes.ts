import { modifiedEntity } from './state';

export const START_LOADING = 'PEOPLE_PAGE_SEARCH:START_LOADING';
export const SUCCESS_LOADING = 'PEOPLE_PAGE_SEARCH:SUCCESS_LOADING';

export type SuccessLoading = {
	people: modifiedEntity<WebApi.Entities.UserProfile[]>;
	teams: modifiedEntity<WebApi.Entities.Team[]>;
};

export type StartLoading = {
	name: string;
};
