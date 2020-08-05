export const SET_TYPES = 'ISSUE:TYPES:SET';
export const LOAD_TYPES = 'ISSUE:TYPES:LOAD';
export const SET_PRIORITIES = 'ISSUE:PRIORITIES:SET';
export const LOAD_PRIORITIES = 'ISSUE:PRIORITIES:LOAD';

export type SetTypes = {
	data: WebApi.Entities.IssueType[];
};

export type SetPriorities = {
	data: WebApi.Entities.Priority[];
};
