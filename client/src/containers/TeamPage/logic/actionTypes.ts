import { Team } from './state';

export const START_LOADING = 'TEAM:START_LOADING';
export const SUCCESS_LOADING = 'TEAM:SUCCESS_LOADING';
export const FAIL_LOADING = 'TEAM:FAIL_LOADING';

export type successLoading = {
	team: Team[];
};
