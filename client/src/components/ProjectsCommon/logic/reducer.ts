import * as actionTypes from './actionTypes';
import { ProjectGeneralState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const projectGeneralReducer = createReducer<ProjectGeneralState>(initialState, {
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
			isDeleted: true,
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
