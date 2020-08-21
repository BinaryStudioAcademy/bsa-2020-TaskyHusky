export const SET_TYPES = 'ISSUE:TYPES:SET';
export const LOAD_TYPES = 'ISSUE:TYPES:LOAD';
export const SET_PRIORITIES = 'ISSUE:PRIORITIES:SET';
export const LOAD_PRIORITIES = 'ISSUE:PRIORITIES:LOAD';
export const CREATE_ISSUE = 'ISSUE:CREATE';
export const CREATE_ISSUE_SUCCESS = 'ISSUE:CREATE_SUCCESS';
export const UPDATE_ISSUE = 'ISSUE:UPDATE';
export const DELETE_ISSUE = 'ISSUE:DELETE_ISSUE';
export const SET_STATUSES = 'ISSUE:SET_STATUSES';
export const LOAD_STATUSES = 'ISSUE:LOAD_STATUSES';

export type SetTypes = {
	data: WebApi.Entities.IssueType[];
};

export type SetPriorities = {
	data: WebApi.Entities.Priority[];
};

export type SetStatuses = {
	data: WebApi.Entities.IssueStatus[];
};

export type CreateIssue = {
	data: WebApi.Issue.PartialIssue;
};

export type UpdateIssue = {
	id: string;
	data: WebApi.Issue.PartialIssue;
};

export type DeleteIssue = {
	id: string;
};
