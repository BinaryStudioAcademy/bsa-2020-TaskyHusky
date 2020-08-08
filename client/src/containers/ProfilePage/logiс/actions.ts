import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const updateUser = createAction<actionTypes.UpdateUser>(actionTypes.UPDATE_USER);
export const requestUpdateUser = createAction<actionTypes.RequestUpdateUser>(actionTypes.REQUEST_UPDATE_USER);
export const requestGetUser = createAction<actionTypes.RequestGetUser>(actionTypes.REQUEST_GET_USER);
