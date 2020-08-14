import * as actionTypes from './actionTypes';
import { createAction } from 'helpers/createAction.helper';

export const setTypes = createAction<actionTypes.SetTypes>(actionTypes.SET_TYPES);
export const setPriorities = createAction<actionTypes.SetPriorities>(actionTypes.SET_PRIORITIES);
export const loadTypes = createAction(actionTypes.LOAD_TYPES);
export const loadPriorities = createAction(actionTypes.LOAD_PRIORITIES);
export const createIssue = createAction<actionTypes.CreateIssue>(actionTypes.CREATE_ISSUE);
export const updateIssue = createAction<actionTypes.UpdateIssue>(actionTypes.UPDATE_ISSUE);
export const deleteIssue = createAction<actionTypes.DeleteIssue>(actionTypes.DELETE_ISSUE);
