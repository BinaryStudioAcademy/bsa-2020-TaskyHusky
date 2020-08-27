import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const startAddingUsers = createAction<actionTypes.AddingUsers>(actionTypes.START_ADDING_USERS);
export const successAddingUsers = createAction(actionTypes.SUCCESS_ADDING_USERS);
export const failAddingUsers = createAction(actionTypes.FAIL_ADDING_USERS);

export const startDeletingUser = createAction<actionTypes.DeletingUsers>(actionTypes.START_DELETING_USERS);
export const successDeletingUser = createAction(actionTypes.SUCCESS_DELETING_USERS);
export const failDeletingUser = createAction(actionTypes.FAIL_DELETING_USERS);

export const resetState = createAction(actionTypes.RESET_STATE);

export const startGettingPeople = createAction(actionTypes.START_GETTING_PEOPLE);
export const successGettingPeople = createAction<actionTypes.UserPeople>(actionTypes.SUCCESS_GETTING_PEOPLE);
export const failGettingPeople = createAction(actionTypes.FAIL_GETTING_PEOPLE);
