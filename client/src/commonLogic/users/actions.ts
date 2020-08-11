import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const requestAllUsers = createAction(actionTypes.REQUEST_ALL_USER);
export const requestAllUsersSuccess = createAction<actionTypes.RequestAllUsersArs>(
	actionTypes.REQUEST_ALL_USER_SUCCESS,
);
