import * as actionTypes from './actionTypes';
import { PeoplePageState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const peoplePageReducer = createReducer<PeoplePageState>(initialState, {
	[actionTypes.START_LOADING](state) {
		return {
			...state,
			isLoading: true,
		};
	},
	[actionTypes.SUCCESS_LOADING](state, { people, teams }) {
		return {
			...state,
			people,
			teams,
			isLoading: false,
		};
	},
});
