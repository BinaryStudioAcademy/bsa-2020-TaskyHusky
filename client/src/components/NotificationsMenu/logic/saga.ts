import * as actions from './actions';
import * as actionTypes from './actionTypes';
import { call, put, takeEvery, all } from 'redux-saga/effects';

import {
	getNotifications,
	viewNotification,
	unviewNotification,
	viewAllNotifications,
} from 'services/notification.service';

function* fetchLoadNotifications() {
	const result = yield call(getNotifications);
	yield put(actions.setNotifications({ notifications: result }));
}

function* watchLoadNotifications() {
	yield takeEvery(actionTypes.LOAD_NOTIFICATIONS, fetchLoadNotifications);
}

function* fetchViewNotification({ id }: ReturnType<typeof actions.viewNotification>) {
	yield viewNotification(id);
}

function* watchViewNotification() {
	yield takeEvery(actionTypes.VIEW_NOTIFICATION, fetchViewNotification);
}

function* fetchUnviewNotification({ id }: ReturnType<typeof actions.unviewNotification>) {
	yield unviewNotification(id);
}

function* watchUnviewNotification() {
	yield takeEvery(actionTypes.UNVIEW_NOTIFICATION, fetchUnviewNotification);
}

function* fetchViewAllNotifications() {
	yield viewAllNotifications();
}

function* watchViewAllNotifications() {
	yield takeEvery(actionTypes.VIEW_ALL_NOTIFICATIONS, fetchViewAllNotifications);
}

export default function* notificationsSaga() {
	yield all([
		watchLoadNotifications(),
		watchViewNotification(),
		watchUnviewNotification(),
		watchViewAllNotifications(),
	]);
}
