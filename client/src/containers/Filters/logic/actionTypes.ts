import { FilterState } from './state';

export const UPDATE_FILTER = 'FILTER:UPDATE_FILTER';
export const FETCH_FILTERS = 'FILTER:FETCH_FILTERS';
export const FETCH_FILTER_PARTS = 'FILTER:FETCH_FILTER_PARTS';
export const FETCH_FILTER_DEFS = 'FILTER:FETCH_FILTER_DEFS';
export const UPDATE_FILTER_SUCCESS = 'FILTER:UPDATE_FILTER_SUCCESS';
export const FETCH_FILTERS_SUCCESS = 'FILTER:FETCH_FILTERS_SUCCESS';
export const FETCH_FILTER_DEFS_SUCCESS = 'FILTER:FETCH_FILTER_DEFS_SUCCESS';
export const FETCH_FILTER_PARTS_SUCCESS = 'FILTER:FETCH_FILTER_PARTS_SUCCESS';
export const DELETE_FILTER = 'FILTER:DELETE_FILTER';
export const DELETE_FILTER_SUCCESS = 'FILTER:DELETE_FILTER_SUCCESS';
export const FETCH_RECENT_FILTERS = 'FILTER:FETCH_RECENT';
export const FETCH_RECENT_SUCCESS = 'FILTER:FETCH_RECENT:SUCCESS';
export const FETCH_FAV_FILTERS = 'FILTER:FETCH_FAV';
export const FETCH_FAV_SUCCESS = 'FILTER:FETCH_FAV:SUCCESS';

export type FetchFilterArgs = {
	userId?: string;
};

export type UpdateFilterArgs = {
	data: Partial<WebApi.Entities.Filter>;
};

export type DeleteFilterArgs = {
	id: string;
};

export type FetchFiltersSuccessArgs = {
	partialState: Partial<FilterState>;
};
