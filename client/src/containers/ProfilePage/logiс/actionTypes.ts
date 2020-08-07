import { UserProfileState } from './state';

export const REQUEST_GET_USER = 'USER:REQUEST_GET_USER';
export const UPDATE_USER = 'USER:UPDATE_USER';
export const REQUEST_UPDATE_USER = 'USER:REQUEST_UPDATE_USER';
export const DELETE_USER = 'USER:DELETE_USER';
export const REQUEST_DELETE_USER = 'USER:REQUEST_DELETE_USER';

export type RequestGetUser = {
	id: string;
};

export type UpdateUser = {
	partialState: Partial<UserProfileState>;
};

export type RequestUpdateUser = Partial<UserProfileState>;

export type RequestDeleteUser = null;

export type DeleteUser = null;
