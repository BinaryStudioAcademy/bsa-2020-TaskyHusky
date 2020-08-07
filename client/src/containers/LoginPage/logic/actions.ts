import { createAction } from 'helpers/createAction.helper';

import * as actionTypes from './actionTypes';

export const triggerLoginUser = createAction<actionTypes.TriggerLoginUser>(actionTypes.TRIGGER_LOGIN_USER);

export const updateLoginUser = createAction<actionTypes.UpdateLoginUser>(actionTypes.UPDATE_LOGIN_USER);

export const registerUserTrigger = createAction<Partial<WebApi.User.UserModel>>(actionTypes.REGISTER_USER_TRIGGER);
export const registerUserSuccess = createAction<WebApi.Result.UserAuthResult>(actionTypes.REGISTER_USER_SUCCESS);
