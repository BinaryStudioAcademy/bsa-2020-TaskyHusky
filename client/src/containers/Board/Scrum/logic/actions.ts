import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const loadSprintsTrigger = createAction<actionTypes.LoadSprintsTrigger>(actionTypes.LOAD_SPRINTS_TRIGGER);
export const loadSprintsSuccess = createAction<actionTypes.LoadSprintsSuccess>(actionTypes.LOAD_SPRINTS_SUCCESS);

export const deleteSprintTrigger = createAction<actionTypes.DeleteSprintTrigger>(actionTypes.DELETE_SPRINT_TRIGGER);

export const loadIssuesTrigger = createAction<actionTypes.LoadIssuesTrigger>(actionTypes.LOAD_ISSUES_TRIGGER);
export const loadIssuesSuccess = createAction<actionTypes.LoadIssuesSuccess>(actionTypes.LOAD_ISSUES_SUCCESS);
