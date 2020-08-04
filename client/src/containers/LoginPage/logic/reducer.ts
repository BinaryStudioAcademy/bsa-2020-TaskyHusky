import * as actionTypes from './actionTypes';
import { AuthState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const authReducer = createReducer<AuthState>(initialState, {
	[actionTypes.UPDATE_LOGIN_USER](state, action: actionTypes.UpdateLoginUser) {
		return {
			...state,
			...action.user,
		};
	},
});
