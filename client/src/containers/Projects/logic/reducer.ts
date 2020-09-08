import * as actionTypes from './actionTypes';
import { ProjectsState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const projectsReducer = createReducer<ProjectsState>(initialState, {
	[actionTypes.START_LOADING](state) {
		return {
			...state,
			isLoading: true,
		};
	},
	[actionTypes.SUCCESS_LOADING](state, { projects }) {
		return {
			...state,
			projects,
			isLoading: false,
		};
	},
	[actionTypes.FAIL_LOADING](state) {
		return {
			...state,
			projects: [],
			isLoading: false,
		};
	},
	[actionTypes.UPDATE_PROJECTS_LIST](state, { projects }) {
		return {
			...state,
			projects,
		};
	},
	[actionTypes.SUCCESS_LOADING_RECENT](state, { projects }: actionTypes.ProjectsList) {
		return {
			...state,
			recent: projects,
		};
	},
});
