import { UserActivityState } from './state';

export const REQUEST_GET_ISSUES = 'DATA:REQUEST_GET_ISSUES';
export const UPDATE_DATA = 'DATA:UPDATE_DATA';

export type RequestGetIssues = {
	id: string;
};

export type UpdateData = {
	partialState: Partial<UserActivityState>;
};
