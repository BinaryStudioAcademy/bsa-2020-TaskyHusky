import { createAction } from 'helpers/createAction.helper';

import * as actionTypes from './actionTypes';

export const triggerLoginUser = createAction<actionTypes.TriggerLoginUser>(actionTypes.TRIGGER_LOGIN_USER);

export const updateLoginUser = createAction<actionTypes.UpdateLoginUser>(actionTypes.UPDATE_LOGIN_USER);

export const logOutUserTrigger = createAction(actionTypes.LOGOUT_USER_TRIGGER);
export const logOutUserSuccess = createAction(actionTypes.LOGOUT_USER_SUCCESS);
