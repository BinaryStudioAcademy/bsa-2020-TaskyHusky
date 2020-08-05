import { FilterState } from './state';

// export const UPDATE = 'EXAMPLE:UPDATE';
// export const TRIGGER_UPDATE_TEXT = 'EXAMPLE:TRIGGER_UPDATE_TEXT';
export const FETCH_FILTERS = 'FILTER:FETCH_FILTERS';
export const FETCH_FILTER_PARTS = 'FILTER:FETCH_FILTER_PARTS';
export const FETCH_FILTER_DEFS = 'FILTER:FETCH_FILTER_DEFS';
export const FETCH_FILTER_DEFS_SUCCESS = 'FILTER:FETCH_FILTER_DEFS_SUCCESS';
export const FETCH_FILTERS_SUCCESS = 'FILTER:FETCH_FILTERS_SUCCESS';
export const FETCH_FILTER_PARTS_SUCCESS = 'FILTER:FETCH_FILTER_PARTS_SUCCESS';

// export type UpdateExampleArgs = {
// 	partialState: Partial<ExampleState>;
// };

// export type GetExampleTextArgs = {
// 	exampleName: string;
// };

export type FetchFiltersSuccessArgs = {
	partialState: Partial<FilterState>;
};

export type FetchFilterPartsSuccessArgs = {
	partialState: Partial<FilterState>;
};

export type FetchFilterDefsSuccessArgs = {
	partialState: Partial<FilterState>;
};
