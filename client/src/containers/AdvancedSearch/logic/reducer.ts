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
	[actionTypes.UPDATE_FILTER_PART_SUCCESS](state, action: actionTypes.UpdateFilterPartArgs) {
		const { filterPart } = action;
		const updatedFilterParts = state.filterParts.map((part) => (part.id === filterPart.id ? filterPart : part));
		return {
			...state,
			filterParts: updatedFilterParts,
		};
	},
});
