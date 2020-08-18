import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const loadSprintsTrigger = createAction<actionTypes.LoadSprintsTrigger>(actionTypes.LOAD_SPRINTS_TRIGGER);
export const loadSprintsSuccess = createAction<actionTypes.LoadSprintsSuccess>(actionTypes.LOAD_SPRINTS_SUCCESS);

export const deleteSprintTrigger = createAction<actionTypes.DeleteSprintTrigger>(actionTypes.DELETE_SPRINT_TRIGGER);

export const loadIssuesTrigger = createAction<actionTypes.LoadIssuesTrigger>(actionTypes.LOAD_ISSUES_TRIGGER);
export const loadIssuesSuccess = createAction<actionTypes.LoadIssuesSuccess>(actionTypes.LOAD_ISSUES_SUCCESS);

export const saveProjectIdToState = createAction<actionTypes.SaveProjectId>(actionTypes.SAVE_PROJECT_ID_TO_STATE);
export const saveBoardIdToState = createAction<actionTypes.SaveBoardId>(actionTypes.SAVE_BOARD_ID_TO_STATE);

export const updateSprintDataTrigger = createAction<actionTypes.UpdateSprintDataTrigger>(
	actionTypes.UPDATE_SPRINT_DATA_TRIGGER,
);
export const updateSprintDataSuccess = createAction<actionTypes.UpdateSprintDataSuccess>(
	actionTypes.UPDATE_SPRINT_DATA_SUCCESS,
);

export const createSprintTrigger = createAction<actionTypes.CreateSprintTrigger>(actionTypes.CREATE_SPRINT_TRIGGER);
export const createSprintSuccess = createAction<actionTypes.CreateSprintSuccess>(actionTypes.CREATE_SPRINT_SUCCESS);
