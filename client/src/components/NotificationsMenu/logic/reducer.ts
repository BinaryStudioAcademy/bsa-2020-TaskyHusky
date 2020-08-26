import * as actionTypes from './actionTypes';
import { createReducer } from 'helpers/createReducer.helper';
import { NotificationsState, initialState } from './state';

export const notificationsReducer = createReducer<NotificationsState>(initialState, {
	[actionTypes.SET_NOTIFICATIONS](state, action: actionTypes.SetNotifications) {
		return {
			...state,
			notifications: [...action.notifications],
		};
	},
});
