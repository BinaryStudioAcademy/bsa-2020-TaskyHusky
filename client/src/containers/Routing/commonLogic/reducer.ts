import * as actionTypes from './actionTypes';
import { CommonState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const commonReducer = createReducer<CommonState>(initialState, {
	[actionTypes.UPDATE_COMMON_STATE_SUCCESS](state, action: actionTypes.UpdateStateSuccessArgs) {
		return {
			...state,
			...action.partialState,
		};
	},
});
