import * as actionTypes from './actionTypes';
import { projectCommonState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const projectCommonReducer = createReducer<projectCommonState>(initialState, {
	[actionTypes.START_DELETING_PROJECT](state) {
		return {
			...state,
			isLoading: true,
		};
	},
	[actionTypes.SUCCESS_DELETING_PROJECT](state) {
		return {
			...state,
			isLoading: false,
		};
	},
	[actionTypes.FAIL_DELETING_PROJECT](state) {
		return {
			...state,
			isLoading: false,
		};
	},
	[actionTypes.RESET_STATE]() {
		return {
			...initialState,
		};
	},
});
