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
			profileLoaded: false,
			loading: false
		};
	},
	[actionTypes.REGISTER_USER_SUCCESS](state, action: WebApi.Result.UserAuthResult) {
		const { user, jwtToken } = action;

		return {
			...state,
			user,
			jwtToken,
			isAuthorized: !!user,
		};
	},
	[actionTypes.LOGOUT_USER_SUCCESS](state) {
		return {
			...state,
			user: null,
			isAuthorized: false,
			jwtToken: '',
			isEmailInDB: null,
		};
	},
	[actionTypes.LOAD_PROFILE_SUCCESS](state, action: actionTypes.LoadProfileSuccess) {
		return {
			...state,
			user: action.user,
			isAuthorized: action.isAuthorized,
			jwtToken: action.jwtToken,
			profileLoaded: true,
		};
	},
	[actionTypes.CHECK_EMAIL_SUCCESS](state, action: actionTypes.CheckEmail) {
		return {
			...state,
			isEmailInDB: !!action.email,
		};
	},
	[actionTypes.CHECK_EMAIL_RESET](state, action: actionTypes.CheckEmail) {
		return {
			...state,
			isEmailInDB: null,
		};
	},
	[actionTypes.GOOGLE_AUTH_LOADING](state, action: actionTypes.Loading) {
		return {
			...state,
			loading: action.loading
		};
	},
});
