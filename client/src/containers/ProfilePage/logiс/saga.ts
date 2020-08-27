import {
	requestUpdateUser,
	requestGetUser,
	requestDeleteUser,
	requestChangePassword,
	requestUdateAvatar,
	requestSendEmailResetLink,
	requestChangeEmail,
} from 'services/user.service';
import { NotificationManager } from 'react-notifications';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

function* updateUser(action: ReturnType<typeof actions.requestUpdateUser>) {
	const { type, ...rest } = action;
	try {
		const user: WebApi.Entities.UserProfile = yield call(requestUpdateUser, rest);
		yield put(actions.updateUser({ partialState: user }));
		NotificationManager.success('User was updated', 'Success', 4000);
	} catch (error) {
		NotificationManager.error('Could not update user', 'Error', 4000);
	}
}

function* changePassword(action: ReturnType<typeof actions.requestChangePassword>) {
	const { oldPassword, newPassword } = action;
	try {
		yield call(requestChangePassword, oldPassword, newPassword);
		NotificationManager.success('Password was updated', 'Success', 4000);
	} catch (error) {
		NotificationManager.error('Could not update password', 'Error', 4000);
	}
}

function* changeEmail(action: ReturnType<typeof actions.requestChangeEmail>) {
	const { password, email, token } = action;
	try {
		const user: WebApi.Entities.UserProfile = yield call(requestChangeEmail, password, email, token);
		yield put(actions.updateUser({ partialState: user }));
		NotificationManager.success('Email was updated', 'Success', 4000);
	} catch (error) {
		NotificationManager.error('Could not update email', 'Error', 4000);
	}
}

function* getUser(action: ReturnType<typeof actions.requestGetUser>) {
	const { id } = action;
	try {
		const user: WebApi.Entities.UserProfile = yield call(requestGetUser, id);
		yield put(actions.updateUser({ partialState: user }));
	} catch (error) {
		NotificationManager.error('Could not get user', 'Error', 4000);
	}
}

function* updateAvatar(action: ReturnType<typeof actions.requestUpdateAvatar>) {
	const { image } = action;
	try {
		yield call(requestUdateAvatar, image);
		NotificationManager.success('Avatar was updated', 'Success', 4000);
	} catch (error) {
		NotificationManager.error('Could not update avatar', 'Error', 4000);
	}
}

export function* sendEmailResetLink(action: ReturnType<typeof actions.sendEmailResetLink>) {
	console.log(action);
	try {
		const { email } = action;
		yield call(requestSendEmailResetLink, email);
		NotificationManager.success('Email was send', 'Success', 4000);
	} catch (error) {
		NotificationManager.error('Could not send email', 'Error');
	}
}

function* deleteUser() {
	yield call(requestDeleteUser);
	yield put(actions.deleteUser(null));
}

function* watchSendEmailLink() {
	yield takeEvery(actionTypes.SEND_EMAIL_RESET_LINK, sendEmailResetLink);
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

function* watchUpdateEmail() {
	yield takeEvery(actionTypes.RESET_EMAIL, changeEmail);
}

export default function* userSaga() {
	yield all([
		watchUpdateUser(),
		watchGetUser(),
		watchDeleteUser(),
		watchChangePassword(),
		watchUpdateAvatar(),
		watchSendEmailLink(),
		watchUpdateEmail(),
	]);
}
