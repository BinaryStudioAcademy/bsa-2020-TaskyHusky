import { UserState } from './state';

export const GET_USER = 'USER:GET_USER';
export const REQUEST_GET_USER = 'USER:REQUEST_GET_USER';
export const UPDATE_USER = 'USER:UPDATE_USER';
export const REQUEST_UPDATE_USER = 'USER:REQUEST_UPDATE_USER';
export const DELETE_USER = 'USER:DELETE_USER';
export const REQUEST_DELETE_USER = 'USER:REQUEST_DELETE_USER';

export type GetUser = {
	partialState: Partial<UserState>;
};

export type RequestGetUser = {
	id: string;
};

export type UpdateUser = {
	partialState: Partial<UserState>;
};

export type RequestUpdateUser = Partial<UserState>;
