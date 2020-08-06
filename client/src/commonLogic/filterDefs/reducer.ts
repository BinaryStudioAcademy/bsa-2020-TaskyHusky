import * as actionTypes from './actionTypes';
import { FilterDefsState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const filterDefsReducer = createReducer<FilterDefsState>(initialState, {
	[actionTypes.UPDATE_FILTER_DEFS_SUCCESS](state, action: actionTypes.UpdateFilterDefsSuccessArgs) {
		return {
			...state,
			...action.partialState,
		};
	},
});
