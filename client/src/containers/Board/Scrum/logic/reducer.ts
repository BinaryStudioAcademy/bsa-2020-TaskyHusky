import { createReducer } from 'helpers/createReducer.helper';
import * as actionTypes from './actionTypes';
import { ScrumBoardState, initialState } from './state';

const addIssuesToSprintObject = (state: ScrumBoardState, action: actionTypes.loadIssuesSuccess) => {
	return state.sprints.map((sprint) => {
		if (sprint.id === action.sprintId) {
			return (sprint.issues = action.issues);
		}
		return sprint;
	});
};

export const scrumBoardReducer = createReducer<ScrumBoardState>(initialState, {
	[actionTypes.LOAD_SPRINTS_SUCCESS](state, action: actionTypes.loadSprintsSuccess) {
		const { sprints } = action;

		return {
			...state,
			sprints,
		};
	},
	[actionTypes.LOAD_ISSUES_SUCCESS](state, action: actionTypes.loadIssuesSuccess) {
		return {
			...state,
			...addIssuesToSprintObject(state, action),
		};
	},
});
