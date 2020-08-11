import { requestUpdateUser, requestGetUser, requestDeleteUser, requestChangePassword } from 'services/user.service';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

function* UpdateUser(action: ReturnType<typeof actions.requestUpdateUser>) {
	const { userData } = action;
	const user: WebApi.Entities.UserProfile = yield call(requestUpdateUser, userData);
	yield put(actions.updateUser({ partialState: user }));
}

function* ChangePassword(action: ReturnType<typeof actions.requestChangePassword>) {
	const { oldPassword, newPassword } = action;
	yield call(requestChangePassword, oldPassword, newPassword);
}
function* GetUser(action: ReturnType<typeof actions.requestGetUser>) {
	const { id } = action;
	const user: WebApi.Entities.UserProfile = yield call(requestGetUser, id);
	yield put(actions.updateUser({ partialState: user }));
}

function* DeleteUser() {
	yield call(requestDeleteUser);
	yield put(actions.deleteUser(null));
}

function* watchChangePassword() {
	yield takeEvery(actionTypes.REQUEST_CHANGE_PASSWORD, ChangePassword);
}

function* watchUpdateUser() {
	yield takeEvery(actionTypes.REQUEST_UPDATE_USER, UpdateUser);
}

function* watchGetUser() {
	yield takeEvery(actionTypes.REQUEST_GET_USER, GetUser);
}

function* watchDeleteUser() {
	yield takeEvery(actionTypes.REQUEST_DELETE_USER, DeleteUser);
}

export default function* userSaga() {
	yield all([watchUpdateUser(), watchGetUser(), watchDeleteUser(), watchChangePassword()]);
}
