import * as actionTypes from './actionType';
import { UserActivityState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const userActivityReducer = createReducer<UserActivityState>(initialState, {
	[actionTypes.UPDATE_DATA](state, action: actionTypes.UpdateData) {
		return {
			...state,
			...action.partialState,
			isLoading: false,
		};
	},
});
