import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const loadNotifications = createAction(actionTypes.LOAD_NOTIFICATIONS);
export const viewNotification = createAction<actionTypes.ViewNotification>(actionTypes.VIEW_NOTIFICATION);
export const setNotifications = createAction<actionTypes.SetNotifications>(actionTypes.SET_NOTIFICATIONS);
