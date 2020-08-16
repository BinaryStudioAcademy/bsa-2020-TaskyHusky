import * as actionTypes from './actionTypes';
import { UserProfileState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const userProfileReducer = createReducer<UserProfileState>(initialState, {
	[actionTypes.UPDATE_USER](state, action: actionTypes.UpdateUser) {
		return {
			...state,
			...action.partialState,
			isLoading: false,
		};
	},
	[actionTypes.DELETE_USER](state) {
		return {
			...state,
			...initialState,
		};
	},
});
