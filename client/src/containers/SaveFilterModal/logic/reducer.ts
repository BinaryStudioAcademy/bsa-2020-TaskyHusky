import * as actionTypes from './actionTypes';
import { SaveFilterState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const saveFilterReducer = createReducer<SaveFilterState>(initialState, {
	[actionTypes.OPEN_MODAL](state) {
		return {
			...state,
			isModalOpened: true,
		};
	},
	[actionTypes.CLOSE_MODAL](state) {
		return {
			...state,
			isModalOpened: false,
		};
	},
	[actionTypes.START_SAVING_FILTER](state) {
		return {
			...state,
			isLoading: true,
		};
	},
	[actionTypes.SUCCESS_SAVING_FILTER](state, action) {
		return {
			...state,
			isLoading: false,
			isModalOpened: false,
			savedFilterId: action.id,
		};
	},
	[actionTypes.FAIL_SAVING_FILTER](state) {
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
	[actionTypes.REDIRECTING](state, { redirecting }) {
		return {
			...state,
			redirecting,
		};
	},
});
