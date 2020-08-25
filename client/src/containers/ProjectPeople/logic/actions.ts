import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const startAddingUsers = createAction<actionTypes.addingUsers>(actionTypes.START_ADDING_USERS);
export const successAddingUsers = createAction(actionTypes.SUCCESS_ADDING_USERS);
export const failAddingUsers = createAction(actionTypes.FAIL_ADDING_USERS);

export const startDeletingUser = createAction<actionTypes.deletingUsers>(actionTypes.START_DELETING_USERS);
export const successDeletingUser = createAction(actionTypes.SUCCESS_DELETING_USERS);
export const failDeletingUser = createAction(actionTypes.FAIL_DELETING_USERS);

export const resetState = createAction(actionTypes.RESET_STATE);
