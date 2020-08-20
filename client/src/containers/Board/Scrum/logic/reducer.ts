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
	[actionTypes.SEARCH_ISSUES_TRIGGER](state, action: actionTypes.SearchIssuesTrigger) {
		const { searchString } = action;
		const trimmedSearchString = searchString.trim().toLowerCase();

		if (!trimmedSearchString) {
			return {
				...state,
				matchIssueToSprint: state.matchIssueToSprintShallowCopy,
			};
		}

		const filterIssues = (text: string, state: ScrumBoardState) => {
			const updatedSprints = Object.entries(state.matchIssueToSprintShallowCopy).map(([sprintId, issues]) => {
				return [sprintId, issues.filter((issue) => issue.summary?.toLowerCase().includes(text))];
			});

			return Object.fromEntries(updatedSprints);
		};

		const newIssues = filterIssues(trimmedSearchString, state);

		return {
			...state,
			matchIssueToSprint: newIssues,
		};
	},
});
