import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const updateUser = createAction<actionTypes.UpdateUser>(actionTypes.UPDATE_USER);
export const requestUpdateUser = createAction<actionTypes.RequestUpdateUser>(actionTypes.REQUEST_UPDATE_USER);
export const requestGetUser = createAction<actionTypes.RequestGetUser>(actionTypes.REQUEST_GET_USER);
export const requestUpdateAvatar = createAction<actionTypes.RequestUpdateAvatar>(actionTypes.REQUEST_UPDATE_AVATAR);
export const deleteUser = createAction<actionTypes.DeleteUser>(actionTypes.DELETE_USER);
export const requestDeleteUser = createAction<actionTypes.RequestDeleteUser>(actionTypes.REQUEST_DELETE_USER);
export const requestChangePassword = createAction<actionTypes.RequestChangePassword>(
	actionTypes.REQUEST_CHANGE_PASSWORD,
);
export const sendEmailResetLink = createAction<actionTypes.SendResetLink>(actionTypes.SEND_EMAIL_RESET_LINK);
export const requestChangeEmail = createAction<actionTypes.RequestChangeEmail>(actionTypes.RESET_EMAIL);
export const sendPassResetLink = createAction<actionTypes.SendResetLink>(actionTypes.SEND_PASS_RESET_LINK);
