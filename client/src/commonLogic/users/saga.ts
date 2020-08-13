import { requestAllUsers } from 'services/user.service';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

function* requestAllUser(action: ReturnType<typeof actions.requestAllUsers>) {
	const users: WebApi.Entities.UserProfile[] = yield call(requestAllUsers);
	yield put(actions.requestAllUsersSuccess({ partialState: { users } }));
}

function* watchRequestAllUsers() {
	yield takeEvery(actionTypes.REQUEST_ALL_USER, requestAllUser);
}

export default function* usersSaga() {
	yield all([watchRequestAllUsers()]);
}
