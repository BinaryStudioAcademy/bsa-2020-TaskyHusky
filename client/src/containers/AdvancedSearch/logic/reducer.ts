import * as actionTypes from './actionTypes';
import { AdvancedSearch, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const advancedSearchReducer = createReducer<AdvancedSearch>(initialState, {
	[actionTypes.UPDATE_SEARCH_SUCCESS](state, action: actionTypes.UpdateSearchArgs) {
		return {
			...state,
			...action.partialState,
		};
	},
});
