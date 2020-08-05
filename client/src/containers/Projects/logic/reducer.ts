import * as actionTypes from './actionTypes';
import { ProjectsState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const projectsReducer = createReducer<ProjectsState>(initialState, {
	[actionTypes.SUCCESS_LOADING](state, { projects }) {
		return {
			...state,
			projects,
		};
	},
});
