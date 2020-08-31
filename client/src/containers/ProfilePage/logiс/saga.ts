import {
	requestUpdateUser,
	requestGetUser,
	requestDeleteUser,
	requestChangePassword,
	requestUdateAvatar,
	requestSendEmailResetLink,
	requestChangeEmail,
} from 'services/user.service';
import i18next from 'i18next';
import { forgotPassword } from 'services/auth.service';
import { NotificationManager } from 'react-notifications';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

function* updateUser(action: ReturnType<typeof actions.requestUpdateUser>) {
	const { type, ...rest } = action;
	try {
		const user: WebApi.Entities.UserProfile = yield call(requestUpdateUser, rest);
		yield put(actions.updateUser({ partialState: user }));
		NotificationManager.success(i18next.t('user_was_updated'), i18next.t('success'), 4000);
	} catch (error) {
		NotificationManager.error(i18next.t('could_not_update_user'), i18next.t('error'), 4000);
	}
}

function* changePassword(action: ReturnType<typeof actions.requestChangePassword>) {
	const { oldPassword, newPassword } = action;
	try {
		yield call(requestChangePassword, oldPassword, newPassword);
		NotificationManager.success(i18next.t('pass_was_updated'), i18next.t('success'), 4000);
	} catch (error) {
		NotificationManager.error(i18next.t('could_not_update_pass'), i18next.t('error'), 4000);
	}
}

function* changeEmail(action: ReturnType<typeof actions.requestChangeEmail>) {
	const { password, email, token } = action;
	try {
		const user: WebApi.Entities.UserProfile = yield call(requestChangeEmail, password, email, token);
		console.log(user);
		yield put(actions.updateUser({ partialState: user }));
		NotificationManager.success(i18next.t('email_was_updated'), i18next.t('success'), 4000);
	} catch (error) {
		NotificationManager.error(i18next.t('could_not_update_email'), i18next.t('error'), 4000);
	}
}

function* getUser(action: ReturnType<typeof actions.requestGetUser>) {
	const { id } = action;
	try {
		const user: WebApi.Entities.UserProfile = yield call(requestGetUser, id);
		yield put(actions.updateUser({ partialState: user }));
	} catch (error) {
		NotificationManager.error(i18next.t('cold_not_get_user'), i18next.t('error'), 4000);
	}
}

function* updateAvatar(action: ReturnType<typeof actions.requestUpdateAvatar>) {
	const { image } = action;
	try {
		yield call(requestUdateAvatar, image);
		NotificationManager.success(i18next.t('avatar_was_updated'), i18next.t('success'), 4000);
	} catch (error) {
		NotificationManager.error(i18next.t('could_not_update_avatar'), i18next.t('error'), 4000);
	}
}

export function* sendEmailResetLink(action: ReturnType<typeof actions.sendEmailResetLink>) {
	try {
		const { email } = action;
		yield call(requestSendEmailResetLink, email);
		NotificationManager.success(i18next.t('email_was_send'), i18next.t('success'), 4000);
	} catch (error) {
		NotificationManager.error(i18next.t('could_not_send_email'), i18next.t('error'));
	}
}

export function* sendPassResetLink(action: ReturnType<typeof actions.sendPassResetLink>) {
	try {
		const { email } = action;
		yield call(forgotPassword, email);
		NotificationManager.success(i18next.t('email_was_send'), i18next.t('success'), 4000);
	} catch (error) {
		NotificationManager.error(i18next.t('could_not_send_email'), i18next.t('error'));
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

function* watchSendPassLink() {
	yield takeEvery(actionTypes.SEND_PASS_RESET_LINK, sendPassResetLink);
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
		watchSendPassLink(),
	]);
}
