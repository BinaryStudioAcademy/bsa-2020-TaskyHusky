import * as actionTypes from './actionTypes';
import { AuthState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const authReducer = createReducer<AuthState>(initialState, {
	[actionTypes.LOGIN_USER_SUCCESS](state, action: actionTypes.LogInUserSuccess) {
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
