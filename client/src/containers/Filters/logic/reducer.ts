import * as actionTypes from './actionTypes';
import { FilterState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const filtersReducer = createReducer<FilterState>(initialState, {
	[actionTypes.UPDATE_FILTER_SUCCESS](state, action) {
		const updatedFilters = state.filters.map((filter) =>
			filter.id === action.filter.id ? { ...action.filter } : filter,
		);
		return {
			...state,
			filters: updatedFilters,
		};
	},
	[actionTypes.FETCH_FILTERS_SUCCESS](state, action: actionTypes.FetchFiltersSuccessArgs) {
		return {
			...state,
			...action.partialState,
			isLoading: false,
		};
	},
	[actionTypes.FETCH_FILTERS](state) {
		return {
			...state,
			isLoading: true,
		};
	},
});
