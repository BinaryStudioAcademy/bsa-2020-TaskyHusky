import { requestUpdateUser, requestDeleteUser } from 'services/user.service';
import { all, put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

function* UpdateUser(action: ReturnType<typeof actions.requestUpdateUser>) {
	const { userData } = action;
	const user: WebApi.Entities.UserProfile = yield call(requestUpdateUser, userData);
	yield put(actions.updateUser({ partialState: user }));
}

function* DeleteUser() {
	yield call(requestDeleteUser);
	yield put(actions.deleteUser(null));
}

function* watchUpdateUser() {
	yield takeLatest([actionTypes.REQUEST_UPDATE_USER, actionTypes.REQUEST_GET_USER], UpdateUser);
}

function* watchDeleteUser() {
	yield takeEvery(actionTypes.REQUEST_DELETE_USER, DeleteUser);
}

export default function* userSaga() {
	yield all([watchUpdateUser(), watchDeleteUser()]);
}
