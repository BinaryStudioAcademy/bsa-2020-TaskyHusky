export const SET_TYPES = 'ISSUE:TYPES:SET';
export const LOAD_TYPES = 'ISSUE:TYPES:LOAD';
export const SET_PRIORITIES = 'ISSUE:PRIORITIES:SET';
export const LOAD_PRIORITIES = 'ISSUE:PRIORITIES:LOAD';
export const CREATE_ISSUE = 'ISSUE:CREATE';
export const UPDATE_ISSUE = 'ISSUE:UPDATE';

export type SetTypes = {
	data: WebApi.Entities.IssueType[];
};

export type SetPriorities = {
	data: WebApi.Entities.Priority[];
};

export type CreateIssue = {
	data: WebApi.Issue.PartialIssue;
};

export type UpdateIssue = {
	id: string;
	data: WebApi.Issue.PartialIssue;
};
