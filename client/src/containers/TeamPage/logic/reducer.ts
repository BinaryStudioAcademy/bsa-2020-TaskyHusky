import * as actionTypes from './actionTypes';
import { TeamState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const teamReducer = createReducer<TeamState>(initialState, {
	[actionTypes.SUCCESS_LOADING](state, { team }) {
		return {
			...state,
			team,
		};
	},
	[actionTypes.ADD_LINK_SUCCESS](state, { team }) {
		return {
			...state,
			team,
		};
	},
	[actionTypes.DELETE_LINK_SUCCESS](state, { team }) {
		return {
			...state,
			team,
		};
	},
});
