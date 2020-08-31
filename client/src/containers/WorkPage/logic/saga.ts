import { requestGetUserIssues } from 'services/user.service';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './actionType';
import * as actions from './actions';
import i18next from 'i18next';
import { UserActivityState } from './state';
import { NotificationManager } from 'react-notifications';

function* getIssue(action: ReturnType<typeof actions.requestGetAssignedIssues>) {
	const { id } = action;
	try {
		const issues: Partial<UserActivityState> = yield call(requestGetUserIssues, id);
		yield put(actions.updateData({ partialState: issues }));
	} catch (error) {
		NotificationManager.error(i18next.t('error_load_data'), i18next.t('error'), 4000);
	}
}

function* watchGetIssue() {
	yield takeEvery(actionTypes.REQUEST_GET_ASSIGNED_ISSUES, getIssue);
}

export default function* userSaga() {
	yield all([watchGetIssue()]);
}
