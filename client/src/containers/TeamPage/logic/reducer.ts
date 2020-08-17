import * as actionTypes from './actionTypes';
import { TeamState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const teamReducer = createReducer<TeamState>(initialState, {
	[actionTypes.SUCCESS_LOADING](state: TeamState, action: actionTypes.SuccessLoading) {
		return {
			...state,
			team: action.team,
			loading: false
		};
	},
	[actionTypes.LOADING](state: TeamState) {
		return {
			...state,
			team: {
				...state.team,
			},
			loading: true
		};
	},
	[actionTypes.FAIL_LOADING](state: TeamState) {
		return {
			...state,
			loading: false
		};
	},
});
