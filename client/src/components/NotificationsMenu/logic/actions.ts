import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const loadNotifications = createAction(actionTypes.LOAD_NOTIFICATIONS);
export const viewNotification = createAction<actionTypes.ViewNotification>(actionTypes.VIEW_NOTIFICATION);
export const unviewNotification = createAction<actionTypes.UnviewNotification>(actionTypes.UNVIEW_NOTIFICATION);
export const viewAllNotifications = createAction(actionTypes.VIEW_ALL_NOTIFICATIONS);
export const setNotifications = createAction<actionTypes.SetNotifications>(actionTypes.SET_NOTIFICATIONS);
