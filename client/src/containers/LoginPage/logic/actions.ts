import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const logInUserTrigger = createAction<actionTypes.LogInUserTrigger>(actionTypes.LOGIN_USER_TRIGGER);
export const logInUserSuccess = createAction<actionTypes.LogInUserSuccess>(actionTypes.LOGIN_USER_SUCCESS);
export const logOutUserTrigger = createAction(actionTypes.LOGOUT_USER_TRIGGER);
export const logOutUserSuccess = createAction(actionTypes.LOGOUT_USER_SUCCESS);
