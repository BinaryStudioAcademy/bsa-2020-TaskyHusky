import * as actionTypes from './actionTypes';
import { CreateProjectsState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const createProjectReducer = createReducer<CreateProjectsState>(initialState, {
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
	[actionTypes.RESET_STATE]() {
		return {
			...initialState,
		};
	},
});
