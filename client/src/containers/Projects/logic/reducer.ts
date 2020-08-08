import * as actionTypes from './actionTypes';
import { ProjectsState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const projectsReducer = createReducer<ProjectsState>(initialState, {
	[actionTypes.START_LOADING](state, { projects }) {
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
});
