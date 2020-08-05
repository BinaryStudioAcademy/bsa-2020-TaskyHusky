import * as actionTypes from './actionTypes';
import { FilterState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const filtersReducer = createReducer<FilterState>(initialState, {
	[actionTypes.FETCH_FILTERS_SUCCESS](state, action: actionTypes.FetchFiltersSuccessArgs) {
		return {
			...state,
			...action.partialState,
		};
	},
	[actionTypes.FETCH_FILTER_PARTS_SUCCESS](state, action: actionTypes.FetchFilterPartsSuccessArgs) {
		return {
			...state,
			...action.partialState,
		};
	},
	[actionTypes.FETCH_FILTER_DEFS_SUCCESS](state, action: actionTypes.FetchFilterDefsSuccessArgs) {
		return {
			...state,
			...action.partialState,
		};
	},
});
