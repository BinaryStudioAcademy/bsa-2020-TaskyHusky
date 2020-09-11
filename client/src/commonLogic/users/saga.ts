import { requestTeammates } from 'services/user.service';
import { all, put, call, takeEvery, select } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

function* requestAllUser(action: ReturnType<typeof actions.requestAllUsers>) {
	const state = yield select();
	const users: WebApi.Entities.UserProfile[] = yield call(requestTeammates, state.auth.user.id);
	yield put(actions.requestAllUsersSuccess({ partialState: { users } }));
}

function* watchRequestAllUsers() {
	yield takeEvery(actionTypes.REQUEST_ALL_USER, requestAllUser);
}

export default function* usersSaga() {
	yield all([watchRequestAllUsers()]);
}
