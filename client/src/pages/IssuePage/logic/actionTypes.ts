export const SET_TYPES = 'ISSUE:TYPES:SET';
export const LOAD_TYPES = 'ISSUE:TYPES:LOAD';
export const SET_PRIORITIES = 'ISSUE:PRIORITIES:SET';
export const LOAD_PRIORITIES = 'ISSUE:PRIORITIES:LOAD';
export const CREATE_ISSUE = 'ISSUE:CREATE';
export const CREATE_ISSUE_SUCCESS = 'ISSUE:CREATE_SUCCESS';
export const UPDATE_ISSUE = 'ISSUE:UPDATE';
export const UPDATE_ISSUE_SUCCESS = 'ISSUE:UPDATE_SUCCESS';
export const DELETE_ISSUE = 'ISSUE:DELETE_ISSUE';
export const SET_STATUSES = 'ISSUE:SET_STATUSES';
export const LOAD_STATUSES = 'ISSUE:LOAD_STATUSES';
export const WATCH_ISSUE = 'ISSUE:WATCH';

export type SetTypes = {
	data: WebApi.Entities.IssueType[];
};

export type SetPriorities = {
	data: WebApi.Entities.Priority[];
};

export type SetStatuses = {
	data: WebApi.Entities.IssueStatus[];
};

export type CreateIssueSuccess = {
	data: WebApi.Issue.PartialIssue;
};

export type CreateIssue = {
	data: WebApi.Issue.PartialIssue;
	files: File[];
};

export type UpdateIssue = {
	id: string;
	data: WebApi.Issue.PartialIssue;
	files?: File[];
};

export type UpdateIssueSuccess = {
	data: WebApi.Entities.Issue;
};

export type DeleteIssue = {
	id: string;
};

export type WatchIssue = {
	id: string;
};
