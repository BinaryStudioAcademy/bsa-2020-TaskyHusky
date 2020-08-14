import { AdvancedSearch, FilterPartState } from './state';

export const FETCH_FILTER_PARTS = 'SEARCH:FETCH_FILTER_PARTS';
export const UPDATE_SEARCH_SUCCESS = 'SEARCH:UPDATE_SEARCH_SUCCESS';
export const UPDATE_FILTER_PART = 'SEARCH:UPDATE_FILTER_PART';
export const UPDATE_FILTER_PART_SUCCESS = 'SEARCH:UPDATE_FILTER_PART_SUCCESS';
export const LOAD_ISSUES = 'SEARCH:LOAD_ISSUES';
export const LOAD_ISSUES_SUCCESS = 'SEARCH:LOAD_ISSUES_SUCCESS';

export type IssueFilter = {
	projects?: string[];
};

export type UpdateSearchArgs = {
	partialState: Partial<AdvancedSearch>;
};

export type UpdateFilterPartArgs = {
	filterPart: FilterPartState;
};
export type LoadIssuesArgs = {
	filter?: IssueFilter;
};
