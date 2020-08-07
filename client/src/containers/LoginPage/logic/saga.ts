import { loginUser, registerUser } from 'services/auth.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* logInRequest(action: ReturnType<typeof actions.triggerLoginUser>) {
	const { email, password } = action;

	try {
		const response: WebApi.Result.UserAuthResult = yield call(loginUser, email, password);
		const { user, jwtToken } = response;
		yield put(actions.updateLoginUser({ user, jwtToken }));
	} catch (e) {
		console.log(e);
		// parse error here
	}
}

export function* watchUserLogin() {
	yield takeEvery(actionTypes.TRIGGER_LOGIN_USER, logInRequest);
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
	yield all([watchUserLogin(), watchRegisterUser()]);
}
