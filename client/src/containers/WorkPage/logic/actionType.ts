import { UserActivityState } from './state';

export const REQUEST_GET_ASSIGNED_ISSUES = 'DATA:REQUEST_GET_ASSIGNED_ISSUES';
export const UPDATE_DATA = 'DATA:UPDATE_DATA';

export type RequestGetAssignedIssues = {
	id: string;
};

export type UpdateData = {
	partialState: Partial<UserActivityState>;
};
