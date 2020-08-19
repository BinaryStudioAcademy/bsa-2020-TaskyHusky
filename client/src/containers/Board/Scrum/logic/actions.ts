import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const loadSprintsTrigger = createAction<actionTypes.LoadSprintsTrigger>(actionTypes.LOAD_SPRINTS_TRIGGER);
export const loadSprintsSuccess = createAction<actionTypes.LoadSprintsSuccess>(actionTypes.LOAD_SPRINTS_SUCCESS);

export const deleteSprintTrigger = createAction<actionTypes.DeleteSprintTrigger>(actionTypes.DELETE_SPRINT_TRIGGER);

export const createSprintTrigger = createAction<actionTypes.CreateSprintTrigger>(actionTypes.CREATE_SPRINT_TRIGGER);
export const createSprintSuccess = createAction<actionTypes.CreateSprintSuccess>(actionTypes.CREATE_SPRINT_SUCCESS);

export const loadIssuesTrigger = createAction<actionTypes.LoadIssuesTrigger>(actionTypes.LOAD_ISSUES_TRIGGER);
export const loadIssuesSuccess = createAction<actionTypes.LoadIssuesSuccess>(actionTypes.LOAD_ISSUES_SUCCESS);

export const updateSprintDataTrigger = createAction<actionTypes.UpdateSprintDataTrigger>(
	actionTypes.UPDATE_SPRINT_DATA_TRIGGER,
);

export const updateSprintDataSuccess = createAction<actionTypes.UpdateSprintDataSuccess>(
	actionTypes.UPDATE_SPRINT_DATA_SUCCESS,
);

export const saveBoardToState = createAction<actionTypes.SaveBoardToState>(actionTypes.SAVE_BOARD_TO_STATE);

export const loadProjectTrigger = createAction<actionTypes.LoadProjectTrigger>(actionTypes.LOAD_PROJECT_TRIGGER);
export const loadProjectSuccess = createAction<actionTypes.LoadProjectSuccess>(actionTypes.LOAD_PROJECT_SUCCESS);
