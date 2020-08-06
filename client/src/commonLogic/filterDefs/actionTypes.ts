import { FilterDefsState } from './state';

export const FETCH_FILTER_DEFS = 'FILTER:FETCH_FILTER_DEFS';
export const UPDATE_FILTER_DEFS_SUCCESS = 'FILTER:UPDATE_FILTER_DEFS_SUCCESS';

export type UpdateFilterDefsSuccessArgs = {
	partialState: Partial<FilterDefsState>;
};
