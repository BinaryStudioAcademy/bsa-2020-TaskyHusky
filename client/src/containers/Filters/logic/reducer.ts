import * as actionTypes from './actionTypes';
import { FilterState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const filtersReducer = createReducer<FilterState>(initialState, {
	[actionTypes.UPDATE_FILTER_SUCCESS](state, action) {
		const updatedFilters = state.filters.map((filter) =>
			filter.id === action.data.id ? { ...action.data } : filter,
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
	[actionTypes.DELETE_FILTER](state) {
		return {
			...state,
			isLoading: true,
		};
	},
	[actionTypes.DELETE_FILTER_SUCCESS](state, action: actionTypes.DeleteFilterArgs) {
		const { filters } = state;
		const updatedFilters = filters.filter(({ id }) => id !== action.id);
		return {
			...state,
			isLoading: false,
			filters: updatedFilters,
		};
	},
	[actionTypes.FETCH_RECENT_SUCCESS](state, action: actionTypes.FetchFiltersSuccessArgs) {
		return {
			...state,
			...action.partialState,
		};
	},
	[actionTypes.FETCH_FAV_SUCCESS](state, action: actionTypes.FetchFiltersSuccessArgs) {
		return {
			...state,
			...action.partialState,
		};
	},
});
