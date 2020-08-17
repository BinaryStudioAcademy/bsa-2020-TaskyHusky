import { createReducer } from 'helpers/createReducer.helper';
import * as actionTypes from './actionTypes';
import { ScrumBoardState, initialState } from './state';

export const scrumBoardReducer = createReducer<ScrumBoardState>(initialState, {
	[actionTypes.LOAD_SPRINTS_SUCCESS](state, action: actionTypes.loadSprintsSuccess) {
		const { sprints } = action;

		return {
			...state,
			sprints,
		};
	},
	[actionTypes.LOAD_ISSUES_SUCCESS](state, action: actionTypes.loadIssuesSuccess) {
		const { sprintId, issues } = action;

		const stateCopy = { ...state };
		stateCopy.matchIssueToSprint[sprintId] = issues;

		return {
			...stateCopy,
		};
	},
});
