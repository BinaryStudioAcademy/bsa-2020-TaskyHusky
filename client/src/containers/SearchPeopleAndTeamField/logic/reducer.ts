import * as actionTypes from './actionTypes';
import { PeoplePagesSearchState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const peoplePageSearchReducer = createReducer<PeoplePagesSearchState>(initialState, {
	[actionTypes.START_LOADING](state) {
		return {
			...state,
			isLoading: true,
		};
	},
	[actionTypes.SUCCESS_LOADING](state, { people, teams }) {
		if (people.length === 0 && teams.length === 0) {
			return {
				...state,
				results: undefined,
				isLoading: false,
			};
		}
		return {
			...state,
			results: {
				users: {
					name: 'users',
					results: [...people],
				},
				teams: {
					name: 'teams',
					results: [...teams],
				},
			},
			isLoading: false,
		};
	},
});
