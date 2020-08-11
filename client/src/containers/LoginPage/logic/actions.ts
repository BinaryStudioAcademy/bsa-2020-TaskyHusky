import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const registerUserTrigger = createAction<Partial<WebApi.Entities.UserProfile>>(
	actionTypes.REGISTER_USER_TRIGGER,
);
export const registerUserSuccess = createAction<WebApi.Result.UserAuthResult>(actionTypes.REGISTER_USER_SUCCESS);

export const logInUserTrigger = createAction<actionTypes.LogInUserTrigger>(actionTypes.LOGIN_USER_TRIGGER);
export const logInUserSuccess = createAction<actionTypes.LogInUserSuccess>(actionTypes.LOGIN_USER_SUCCESS);

export const logOutUserTrigger = createAction(actionTypes.LOGOUT_USER_TRIGGER);
export const logOutUserSuccess = createAction(actionTypes.LOGOUT_USER_SUCCESS);

export const loadProfileTrigger = createAction(actionTypes.LOAD_PROFILE_TRIGGER);
export const loadProfileSuccess = createAction<actionTypes.LoadProfileSuccess>(actionTypes.LOAD_PROFILE_SUCCESS);

export const checkEmailTrigger = createAction<actionTypes.CheckEmail>(actionTypes.CHECK_EMAIL_TRIGGER);
export const checkEmailSuccess = createAction<actionTypes.CheckEmail>(actionTypes.CHECK_EMAIL_SUCCESS);
export const checkEmailReset = createAction(actionTypes.CHECK_EMAIL_RESET);
