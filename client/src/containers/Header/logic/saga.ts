import * as service from 'services/header.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import * as peopleActions from '../../People/logic/actions';

export function* fetchInvites(action: ReturnType<typeof actions.startLoading>) {
	const invites = yield call(service.getInvites, action.id);
	yield put(actions.successLoading({ invites }));
}

export function* watchStartLoading() {
	yield takeEvery(actionTypes.START_LOADING, fetchInvites);
}

export function* changeInviteStatus(action: ReturnType<typeof actions.changeInviteStatus>) {
	const { userId, status, teammateId } = action;

	yield call(service.changeStatus, { userId, status, teammateId });

	yield put(actions.startLoading({ id: userId }));
	yield put(peopleActions.startLoading({ id: userId }));
}

export function* watchChangeInviteStatus() {
	yield takeEvery(actionTypes.CHANGE_INVITE_STATUS, changeInviteStatus);
}

export default function* headerSaga() {
	yield all([watchStartLoading(), watchChangeInviteStatus()]);
}
