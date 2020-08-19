import * as actionTypes from './actionTypes';
import { ProjectState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const projectReducer = createReducer<ProjectState>(initialState, {
	[actionTypes.START_DELETING_PROJECT](state) {
		return {
			...state,
			isLoading: true,
		};
	},
	[actionTypes.SUCCESS_DELETING_PROJECT]() {
		return {
			...initialState,
			isLoading: false,
		};
	},
	[actionTypes.START_GETTING_PROJECT](state) {
		return {
			...state,
			isLoading: true,
		};
	},
	[actionTypes.SUCCESS_GETTING_PROJECT](state, { project }) {
		return {
			...state,
			project,
			isLoading: false,
		};
	},
	[actionTypes.FAIL_GETTING_PROJECT](state) {
		return {
			...state,
			is404Error: true,
		};
	},
	[actionTypes.START_UPDATING_PROJECT](state) {
		return {
			...state,
			isLoading: true,
		};
	},
	[actionTypes.SUCCESS_UPDATING_PROJECT](state, { project }) {
		return {
			...state,
			project,
			isLoading: false,
		};
	},
	[actionTypes.FAIL_UPDATING_PROJECT](state) {
		return {
			...state,
			isLoading: false,
		};
	},
});
