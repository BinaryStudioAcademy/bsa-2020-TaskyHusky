import { loginUser, registerUser } from 'services/auth.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { NotificationManager } from 'react-notifications';

export function* logInRequest({ email, password }: ReturnType<typeof actions.logInUserTrigger>) {
	try {
		const response: WebApi.Result.UserAuthResult = yield call(loginUser, email, password);
		const { user, jwtToken } = response;
		yield put(actions.logInUserSuccess({ user, jwtToken }));
	} catch (err) {
		if (err.status === 401) {
			NotificationManager.error('Invalid email or password', 'Error', 4000);
		} else {
			throw err;
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
		yield put(actions.registerUserSuccess(response));
	} catch (error) {
		console.log(error);
		// parse error here
	}
}

export function* watchRegisterUser() {
	yield takeEvery(actionTypes.REGISTER_USER_TRIGGER, registerUserRequest);
}

export default function* authSaga() {
	yield all([watchUserLogin(), watchUserLogOut(), watchRegisterUser()]);
}
