import * as actionTypes from './actionTypes';
import { HeaderState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const headerReducer = createReducer<HeaderState>(initialState, {
	[actionTypes.SUCCESS_LOADING](state, invites) {
		return {
			...state,
			invites: invites.invites,
		};
	},
});
