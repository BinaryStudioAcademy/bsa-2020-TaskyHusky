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
	[actionTypes.RESET_STATE](state) {
		return {
			...state,
			isFilterEdited: false,
		};
	},
	[actionTypes.LOAD_FILTER](state) {
		return {
			...state,
		};
	},
	[actionTypes.LOAD_FILTER_SUCCESS](state, action: actionTypes.LoadFilterSuccessArgs) {
		const { filter } = action;

		const updatedFilterParts = state.filterParts.map((filterPart) => {
			const loaded = filter.filterParts?.find((el) => el.filterDef.id === filterPart.filterDef.id);
			return loaded ? loaded : filterPart;
		}) as FilterPartState[];

		const addedFilterParts = getAdditionalFilterParts(updatedFilterParts).filter(
			({ members, searchText }) => members.length > 0 || searchText,
		);

		return {
			...state,
			filter,
			addedFilterParts,
			filterParts: updatedFilterParts,
			isFilterEdited: false,
		};
	},
	[actionTypes.UPDATE_FILTER_PART_SUCCESS](state, action: actionTypes.UpdateFilterPartArgs) {
		const { filterPart } = action;
		const updatedFilterParts = state.filterParts.map((part) => (part.id === filterPart.id ? filterPart : part));
		return {
			...state,
			filterParts: updatedFilterParts,
			isFilterEdited: true,
		};
	},
	[actionTypes.LOAD_ISSUES_SUCCESS](state, action: actionTypes.LoadIssuesSuccessArgs) {
		const { issues } = action;
		return {
			...state,
			issues,
		};
	},
	[actionTypes.SET_REDIRECT](state, action: actionTypes.RedirectId) {
		const { redirectFilterId } = action;
		return {
			...state,
			redirectFilterId,
		};
	},
	[actionTypes.UPDATE_FILTER_SUCCESS](state, action: actionTypes.RedirectId) {
		return {
			...state,
			isFilterEdited: false,
		};
	},
});
