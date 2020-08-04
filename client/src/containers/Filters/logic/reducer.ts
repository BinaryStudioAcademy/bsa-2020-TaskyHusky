import * as actionTypes from './actionTypes';
import { FilterState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const filtersReducer = createReducer<FilterState>(initialState, {
	[actionTypes.FETCH_FILTERS](state, action: actionTypes.FetchFiltersArgs) {
		return {
			...state,
			...action.partialState,
		};
	},
});
