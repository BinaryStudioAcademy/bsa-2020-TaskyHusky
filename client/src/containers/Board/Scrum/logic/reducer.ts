import { createReducer } from 'helpers/createReducer.helper';
import * as actionTypes from './actionTypes';
import { ScrumBoardState, initialState } from './state';

export const scrumBoardReducer = createReducer<ScrumBoardState>(initialState, {
	[actionTypes.LOAD_SPRINTS_SUCCESS](state, action: actionTypes.LoadSprintsSuccess) {
		const { sprints } = action;

		return {
			...state,
			sprints,
		};
	},
	[actionTypes.LOAD_ISSUES_SUCCESS](state, action: actionTypes.LoadIssuesSuccess) {
		const { sprintId, issues } = action;

		const stateCopy = { ...state };
		stateCopy.matchIssueToSprint[sprintId] = issues;

		return {
			...stateCopy,
		};
	},
	[actionTypes.SAVE_PROJECT_ID_TO_STATE](state, action: actionTypes.SaveProjectId) {
		const { projectId } = action;

		return {
			...state,
			projectId,
		};
	},
	[actionTypes.SAVE_BOARD_ID_TO_STATE](state, action: actionTypes.SaveBoardId) {
		const { boardId } = action;

		return {
			...state,
			boardId,
		};
	},
});
