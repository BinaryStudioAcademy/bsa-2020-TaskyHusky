import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const loadNotifications = createAction<actionTypes.LoadNotifications>(actionTypes.LOAD_NOTIFICATIONS);
export const setNotifications = createAction<actionTypes.SetNotifications>(actionTypes.SET_NOTIFICATIONS);
