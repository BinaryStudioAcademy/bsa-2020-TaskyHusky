import * as actionTypes from './actionTypes';
import { AuthState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const authReducer = createReducer<AuthState>(initialState, {
	[actionTypes.UPDATE_LOGIN_USER](state, action: actionTypes.UpdateLoginUser) {
		return {
			...state,
			user: action.user,
			isAuthorized: !!action.user,
			jwtToken: action.jwtToken,
		};
	},
	[actionTypes.LOGOUT_USER_SUCCESS](state, action) {
		return {
			...state,
			user: null,
			isAuthorized: false,
			jwtToken: '',
		};
	},
});
