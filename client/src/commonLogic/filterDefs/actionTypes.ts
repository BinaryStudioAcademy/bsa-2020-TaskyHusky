import { FilterDefsState } from './state';

export const FETCH_FILTER_DEFS = 'FILTER_DEFS:FETCH_FILTER_DEFS';
export const UPDATE_FILTER_DEFS_SUCCESS = 'FILTER_DEFS:UPDATE_FILTER_DEFS_SUCCESS';

export type UpdateFilterDefsSuccessArgs = {
	partialState: Partial<FilterDefsState>;
};
