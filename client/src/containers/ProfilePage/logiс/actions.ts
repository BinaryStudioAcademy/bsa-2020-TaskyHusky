import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const updateUser = createAction<actionTypes.UpdateUser>(actionTypes.UPDATE_USER);
export const requestUpdateUser = createAction<actionTypes.RequestUpdateUser>(actionTypes.REQUEST_UPDATE_USER);
export const requestGetUser = createAction<actionTypes.RequestGetUser>(actionTypes.REQUEST_GET_USER);
export const deleteUser = createAction<actionTypes.DeleteUser>(actionTypes.DELETE_USER);
export const requestDeleteUser = createAction<actionTypes.RequestDeleteUser>(actionTypes.REQUEST_DELETE_USER);
export const requestChangePassword = createAction<actionTypes.RequestChangePassword>(
	actionTypes.REQUEST_CHANGE_PASSWORD,
);
