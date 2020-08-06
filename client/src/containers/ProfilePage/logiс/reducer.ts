import * as actionTypes from './actionTypes';
import { UserState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const userReducer = createReducer<UserState>(initialState, {
	[actionTypes.UPDATE_USER](state, action: actionTypes.UpdateUser) {
		return {
			...state,
			...action.partialState,
		};
	},
	[actionTypes.GET_USER](state, action: actionTypes.GetUser) {
		return {
			...state,
			...action.partialState,
		};
	},
});
