import * as actionTypes from './actionTypes';
import { ProjectState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const projectReducer = createReducer<ProjectState>(initialState, {
	[actionTypes.START_DELETING](state) {
		return {
			...state,
			isLoading: true,
		};
	},
	[actionTypes.SUCCESS_DELETING](state, { projects }) {
		return {
			...state,
			projects,
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
});
