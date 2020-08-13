import { UsersState } from './state';

export const REQUEST_ALL_USER = 'USER:REQUEST_ALL_USER';
export const REQUEST_ALL_USER_SUCCESS = 'USER:REQUEST_ALL_USER_SUCCESS';

export type RequestAllUsersArs = {
	partialState: Partial<UsersState>;
};
