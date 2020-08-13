import {
	requestUpdateUser,
	requestGetUser,
	requestDeleteUser,
	requestChangePassword,
	requestUdateAvatar,
} from 'services/user.service';

import { all, put, call, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

function* updateUser(action: ReturnType<typeof actions.requestUpdateUser>) {
	const { type, ...rest } = action;
	const user: WebApi.Entities.UserProfile = yield call(requestUpdateUser, rest);
	yield put(actions.updateUser({ partialState: user }));
}

function* changePassword(action: ReturnType<typeof actions.requestChangePassword>) {
	const { oldPassword, newPassword } = action;
	yield call(requestChangePassword, oldPassword, newPassword);
}
function* getUser(action: ReturnType<typeof actions.requestGetUser>) {
	const { id } = action;
	const user: WebApi.Entities.UserProfile = yield call(requestGetUser, id);
	yield put(actions.updateUser({ partialState: user }));
}

function* updateAvatar(action: ReturnType<typeof actions.requestUpdateAvatar>) {
	const { image } = action;
	yield call(requestUdateAvatar, image);
}

function* deleteUser() {
	yield call(requestDeleteUser);
	yield put(actions.deleteUser(null));
}

function* watchUpdateAvatar() {
	yield takeEvery(actionTypes.REQUEST_UPDATE_AVATAR, updateAvatar);
}

function* watchChangePassword() {
	yield takeEvery(actionTypes.REQUEST_CHANGE_PASSWORD, changePassword);
}

function* watchUpdateUser() {
	yield takeEvery(actionTypes.REQUEST_UPDATE_USER, updateUser);
}

function* watchGetUser() {
	yield takeEvery(actionTypes.REQUEST_GET_USER, getUser);
}

function* watchDeleteUser() {
	yield takeEvery(actionTypes.REQUEST_DELETE_USER, deleteUser);
}

export default function* userSaga() {
	yield all([watchUpdateUser(), watchGetUser(), watchDeleteUser(), watchChangePassword(), watchUpdateAvatar()]);
}
