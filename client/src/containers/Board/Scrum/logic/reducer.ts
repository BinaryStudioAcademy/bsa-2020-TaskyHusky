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
			matchIssueToSprintShallowCopy: stateCopy.matchIssueToSprint,
		};
	},
	[actionTypes.UPDATE_SPRINT_DATA_SUCCESS](state, action: actionTypes.UpdateSprintDataSuccess) {
		const updatedSprints = state.sprints.map((sprint) => {
			if (sprint.id === action.sprint.id) {
				return action.sprint;
			}

			return sprint;
		});

		return {
			...state,
			sprints: updatedSprints,
		};
	},
	[actionTypes.CREATE_SPRINT_SUCCESS](state, action: actionTypes.CreateSprintSuccess) {
		const { sprint } = action;
		const updatedSprints = state.sprints.concat(sprint);

		return {
			...state,
			sprints: updatedSprints,
		};
	},
	[actionTypes.SAVE_BOARD_TO_STATE](state, action: actionTypes.SaveBoardToState) {
		const { board } = action;

		return {
			...state,
			board,
		};
	},
	[actionTypes.LOAD_PROJECT_SUCCESS](state, action: actionTypes.LoadProjectSuccess) {
		const { project } = action;

		return {
			...state,
			project,
		};
	},
	[actionTypes.DELETE_SPRINT_SUCCESS](state, action: actionTypes.DeleteSprintSuccess) {
		const {
			sprint: { id: deletedSprintId },
		} = action;

		const updatedSprints = state.sprints.filter((sprint) => sprint.id !== deletedSprintId);

		return {
			...state,
			sprints: updatedSprints,
		};
	},
});
