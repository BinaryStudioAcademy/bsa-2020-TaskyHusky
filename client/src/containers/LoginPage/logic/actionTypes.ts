import { User } from './state';

export const LOGIN_USER_TRIGGER = 'LOGIN_USER_TRIGGER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export const REGISTER_USER_TRIGGER = 'REGISTER_USER_TRIGGER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';

export const LOGOUT_USER_TRIGGER = 'LOGOUT_USER_TRIGGER';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

export type LogInUserTrigger = {
	email: string;
	password: string;
};

export interface LogInUserSuccess {
	user: User;
	isAuthorized?: boolean;
	jwtToken: string;
}
