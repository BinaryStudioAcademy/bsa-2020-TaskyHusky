import {
	loginUser,
	registerUser,
	getProfile,
	checkEmail,
	googleAuthRequest,
	forgotPassword as forgotPasswordQuery,
	resetPassword as resetPasswordQuery,
} from 'services/auth.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { NotificationManager } from 'react-notifications';
import { LocalStorageKeys } from 'constants/LocalStorageKeys';
import { User } from './state';
import { setToken, removeToken } from 'helpers/setToken.helper';

export function* logInRequest({ email, password }: ReturnType<typeof actions.logInUserTrigger>) {
	try {
		const response: WebApi.Result.UserAuthResult = yield call(loginUser, email, password);
		const { user, jwtToken } = response;
		setToken(jwtToken);
		yield put(actions.logInUserSuccess({ user, jwtToken }));
	} catch (err) {
		if (err.status === 401) {
			NotificationManager.error('Invalid email or password', 'Error', 4000);
		} else {
			console.log(err);
		}
	}
}

export function* watchUserLogin() {
	yield takeEvery(actionTypes.LOGIN_USER_TRIGGER, logInRequest);
}

export function* logOutRequest() {
	try {
		// TODO: handle token inactivation on server side
		yield put(actions.logOutUserSuccess());
	} catch (error) {
		console.log(error);
	}
}

export function* watchUserLogOut() {
	yield takeEvery(actionTypes.LOGOUT_USER_TRIGGER, logOutRequest);
}

export function* registerUserRequest(action: ReturnType<typeof actions.registerUserTrigger>) {
	try {
		const { type, ...userData } = action;
		const response: WebApi.Result.UserAuthResult = yield call(registerUser, userData);
		setToken(response.jwtToken);
		yield put(actions.registerUserSuccess(response));
	} catch (error) {
		NotificationManager.error(error.clientException.message, 'Error');
	}
}

export function* watchRegisterUser() {
	yield takeEvery(actionTypes.REGISTER_USER_TRIGGER, registerUserRequest);
}

export function* getProfileRequest() {
	try {
		const user: User = yield call(getProfile);
		const jwtToken: string | null = localStorage.getItem(LocalStorageKeys.SESSION_TOKEN);

		if (!jwtToken) {
			throw new Error();
		}

		yield put(
			actions.loadProfileSuccess({
				user,
				jwtToken,
				isAuthorized: true,
			}),
		);
	} catch (err) {
		removeToken();
		yield put(
			actions.loadProfileSuccess({
				user: null,
				jwtToken: '',
				isAuthorized: false,
			}),
		);
	}
}

export function* watchLoadProfile() {
	yield takeEvery(actionTypes.LOAD_PROFILE_TRIGGER, getProfileRequest);
}

export function* checkEmailRequest(action: ReturnType<typeof actions.checkEmailTrigger>) {
	try {
		const { email } = action;
		const response = yield call(checkEmail, email);

		const { email: resEmail } = response;
		yield put(actions.checkEmailSuccess({ email: resEmail }));
	} catch (error) {
		NotificationManager.error(error.clientException.message, 'Error');
	}
}

export function* watchCheckEmail() {
	yield takeEvery(actionTypes.CHECK_EMAIL_TRIGGER, checkEmailRequest);
}

export function* googleAuth(action: { user: actionTypes.GoogleUser; type: string }) {
	yield put(actions.loadingGoogleAuth({ loading: true }));
	try {
		const response = yield call(googleAuthRequest, action.user);
		const { user, jwtToken } = response;
		setToken(jwtToken);
		yield put(actions.logInUserSuccess({ user, jwtToken }));
	} catch (error) {
		NotificationManager.error(error.clientException.message, 'Error');
		yield put(actions.loadingGoogleAuth({ loading: false }));
	}
}

export function* forgotPassword(action: ReturnType<typeof actions.forgotPassword>) {
	try {
		const { email } = action;
		yield call(forgotPasswordQuery, email);
	} catch (error) {
		NotificationManager.error(error.clientException.message, 'Error');
	}
}

export function* watchGoogleAuth() {
	yield takeEvery(actionTypes.GOOGLE_AUTH_REQUEST, googleAuth);
}

export function* watchForgotPassword() {
	yield takeEvery(actionTypes.FORGOT_PASSWORD, forgotPassword);
}

export function* resetPassword(action: ReturnType<typeof actions.resetPassword>) {
	try {
		const { password, id } = action;
		const user = yield call(resetPasswordQuery, password, id);
		yield put(actions.logInUserTrigger({ email: user.email, password }));
	} catch (error) {
		NotificationManager.error(error.clientException.message, 'Error');
	}
}

export function* watchResetPassword() {
	yield takeEvery(actionTypes.RESET_PASSWORD, resetPassword);
}

export default function* authSaga() {
	yield all([
		watchUserLogin(),
		watchUserLogOut(),
		watchRegisterUser(),
		watchLoadProfile(),
		watchCheckEmail(),
		watchForgotPassword(),
		watchResetPassword(),
		watchGoogleAuth(),
	]);
}
