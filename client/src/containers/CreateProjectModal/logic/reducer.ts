import * as actionTypes from './actionTypes';
import { CreateProjectsState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const createProjectReducer = createReducer<CreateProjectsState>(initialState, {
	[actionTypes.START_CREATING_PROJECT](state) {
		return {
			...state,
			isLoading: true,
		};
	},
	[actionTypes.SUCCESS_CREATING_PROJECT](state) {
		return {
			...state,
			isLoading: false,
			isModalOpened: false,
			isProjectCreated: true,
		};
	},
	[actionTypes.FAIL_CREATING_PROJECT](state) {
		return {
			...state,
			isLoading: false,
		};
	},
	[actionTypes.SUCCESS_GETTING_KEYS](state, { keys }) {
		return {
			...state,
			keys,
		};
	},
	[actionTypes.FAIL_GETTING_KEYS](state) {
		return {
			...state,
			isError: true,
		};
	},
	[actionTypes.RESET_STATE]() {
		return {
			...initialState,
		};
	},
});
