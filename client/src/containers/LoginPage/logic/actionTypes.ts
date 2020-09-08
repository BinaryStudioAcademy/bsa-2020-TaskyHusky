import { User } from './state';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

export const LOGIN_USER_TRIGGER = 'LOGIN_USER_TRIGGER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export const REGISTER_USER_TRIGGER = 'REGISTER_USER_TRIGGER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';

export const LOGOUT_USER_TRIGGER = 'LOGOUT_USER_TRIGGER';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

export const LOAD_PROFILE_TRIGGER = 'LOAD_PROFILE_TRIGGER';
export const LOAD_PROFILE_SUCCESS = 'LOAD_PROFILE_SUCCESS';

export const CHECK_EMAIL_TRIGGER = 'CHECK_EMAIL_TRIGGER';
export const CHECK_EMAIL_SUCCESS = 'CHECK_EMAIL_SUCCESS';
export const CHECK_EMAIL_RESET = 'CHECK_EMAIL_RESET';

export const GOOGLE_AUTH_REQUEST = 'GOOGLE_AUTH_REQUEST';
export const GOOGLE_AUTH_LOADING = 'GOOGLE_AUTH_LOADING';
export const UPDATE_USER = 'UPDATE_USER';

export type UpdateUser = {
	avatar?: string;
	id: string;
	email: string;
};

export type GoogleUser = {
	user: GoogleLoginResponse | GoogleLoginResponseOffline;
};

export type Loading = {
	loading: boolean;
};
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';

export const RESET_PASSWORD = 'RESET_PASSWORD';

export type LogInUserTrigger = {
	email: string;
	password: string;
};

export type LogInUserSuccess = {
	user: User;
	isAuthorized?: boolean;
	jwtToken: string;
};

export type LoadProfileSuccess = {
	user: User | null;
	isAuthorized: boolean;
	jwtToken: string;
};

export type CheckEmail = {
	email: string;
};

export type ForgotPassword = {
	email: string;
};

export type ResetPassword = {
	password: string;
	id: string;
};
