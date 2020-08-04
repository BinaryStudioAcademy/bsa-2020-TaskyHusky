import { AuthState } from './state';

export const TRIGGER_LOGIN_USER = 'TRIGGER_LOGIN_USER';
export const UPDATE_LOGIN_USER = 'UPDATE_LOGIN_USER';

export type TriggerLoginUser = {
	email: string;
	password: string;
};

export type UpdateLoginUser = {
	user: AuthState;
};
