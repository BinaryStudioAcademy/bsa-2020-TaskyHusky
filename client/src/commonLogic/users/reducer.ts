import * as actionTypes from './actionTypes';
import { UsersState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const usersReducer = createReducer<UsersState>(initialState, {
	[actionTypes.REQUEST_ALL_USER_SUCCESS](state, action: actionTypes.RequestAllUsersArs) {
		return {
			...state,
			...action.partialState,
		};
	},
});
