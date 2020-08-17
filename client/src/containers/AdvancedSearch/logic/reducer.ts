import * as actionTypes from './actionTypes';
import { AdvancedSearch, initialState, FilterPartState } from './state';
import { createReducer } from 'helpers/createReducer.helper';
import { getAdditionalFilterParts } from './helpers';

export const advancedSearchReducer = createReducer<AdvancedSearch>(initialState, {
	[actionTypes.UPDATE_SEARCH_SUCCESS](state, action: actionTypes.UpdateSearchArgs) {
		return {
			...state,
			...action.partialState,
		};
	},
	[actionTypes.LOAD_FILTER](state) {
		return {
			...state,
		};
	},
	[actionTypes.LOAD_FILTER_SUCCESS](state, action: actionTypes.LoadFilterSuccessArgs) {
		const { filter } = action;

		const addedFilterParts = getAdditionalFilterParts(filter.filterParts as FilterPartState[]).filter(
			({ members, searchText }) => members.length > 0 || searchText,
		);

		const updatedFilterParts = state.filterParts.map((filterPart) => {
			const loaded = filter.filterParts?.find((el) => el.filterDef.id === filterPart.filterDef.id);
			return loaded ? loaded : filterPart;
		}) as FilterPartState[];

		return {
			...state,
			filter,
			addedFilterParts,
			filterParts: updatedFilterParts,
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
	[actionTypes.LOAD_ISSUES_SUCCESS](state, action: actionTypes.LoadIssuesSuccessArgs) {
		const { issues } = action;
		return {
			...state,
			issues,
		};
	},
});
