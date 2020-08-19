import { AdvancedSearch, FilterPartState } from './state';

export const FETCH_FILTER_PARTS = 'SEARCH:FETCH_FILTER_PARTS';
export const UPDATE_SEARCH_SUCCESS = 'SEARCH:UPDATE_SEARCH_SUCCESS';
export const UPDATE_FILTER_PART = 'SEARCH:UPDATE_FILTER_PART';
export const UPDATE_FILTER_PART_SUCCESS = 'SEARCH:UPDATE_FILTER_PART_SUCCESS';
export const LOAD_ISSUES = 'SEARCH:LOAD_ISSUES';
export const LOAD_ISSUES_SUCCESS = 'SEARCH:LOAD_ISSUES_SUCCESS';
export const GET_FILTER_PARTS_FROM_STATE = 'SEARCH:GET_FILTER_PARTS_FROM_STATE';
export const LOAD_FILTER = 'SEARCH:LOAD_FILTER';
export const LOAD_FILTER_SUCCESS = 'SEARCH:LOAD_FILTER_SUCCESS';
export const SET_ADDED_FILTER_PARTS = 'SEARCH:SET_ADDED_FILTER_PARTS';
export const RESET_STATE = 'SEARCH:RESET_STATE';
export const UPDATE_FILTER = 'SEARCH:UPDATE_FILTER';
export const UPDATE_FILTER_SUCCESS = 'SEARCH:UPDATE_FILTER_SUCCESS';
export const SET_REDIRECT = 'SEARCH:SET_REDIRECT';
export const UPDATE_FILTER_STARED_BY = 'SEARCH:UPDATE_FILTER_STARED_BY';

export type IssueFilter = {
	projects?: string[];
};

export type UpdateSearchArgs = {
	partialState: Partial<AdvancedSearch>;
};

export type UpdateFilterPartArgs = {
	filterPart: FilterPartState;
};

export type LoadIssuesSuccessArgs = {
	issues: WebApi.Entities.Issue[];
	issuesCount: number;
};

export type LoadFilterByIdArgs = {
	id: string;
};

export type LoadFilterSuccessArgs = {
	filter: WebApi.Entities.Filter;
};

export type SetAddedFilterPartsArgs = {
	addedFilterParts: FilterPartState[];
};

export type RedirectId = {
	redirectFilterId: string;
};

export type UpdateFilterStaredBy = {
	staredBy: string;
};

export type LoadIssues = {
	page?: number;
};
