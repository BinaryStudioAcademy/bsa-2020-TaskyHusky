import * as actions from './actions';
import * as actionTypes from './actionTypes';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { getNotifications } from 'services/notification.service';

function* fetchNotifications({ userId }: ReturnType<typeof actions.loadNotifications>) {
	const result = yield call(getNotifications, userId);
	yield put(actions.setNotifications({ notifications: result }));
}

function* watchLoadNotifications() {
	yield takeEvery(actionTypes.LOAD_NOTIFICATIONS, fetchNotifications);
}

export default function* notificationsSaga() {
	yield all([watchLoadNotifications()]);
}
