import * as actionTypes from './actionTypes';
import { createAction } from 'helpers/createAction.helper';

export const setTypes = createAction<actionTypes.SetTypes>(actionTypes.SET_TYPES);
export const setPriorities = createAction<actionTypes.SetPriorities>(actionTypes.SET_PRIORITIES);
export const setStatuses = createAction<actionTypes.SetStatuses>(actionTypes.SET_STATUSES);
export const loadTypes = createAction(actionTypes.LOAD_TYPES);
export const loadPriorities = createAction(actionTypes.LOAD_PRIORITIES);
export const loadStatuses = createAction(actionTypes.LOAD_STATUSES);
export const createIssue = createAction<actionTypes.CreateIssue>(actionTypes.CREATE_ISSUE);
export const createIssueSuccess = createAction<actionTypes.CreateIssueSuccess>(actionTypes.CREATE_ISSUE_SUCCESS);
export const updateIssue = createAction<actionTypes.UpdateIssue>(actionTypes.UPDATE_ISSUE);
export const updateIssueSuccess = createAction<actionTypes.UpdateIssueSuccess>(actionTypes.UPDATE_ISSUE_SUCCESS);
export const deleteIssue = createAction<actionTypes.DeleteIssue>(actionTypes.DELETE_ISSUE);
export const watchIssue = createAction<actionTypes.WatchIssue>(actionTypes.WATCH_ISSUE);
