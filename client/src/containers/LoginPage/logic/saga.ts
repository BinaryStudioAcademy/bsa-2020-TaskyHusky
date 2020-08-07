import { loginUser } from 'services/auth.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { NotificationManager } from 'react-notifications';

export function* logInRequest({ email, password }: ReturnType<typeof actions.triggerLoginUser>) {
	try {
		const response: WebApi.Result.UserAuthResult = yield call(loginUser, email, password);
		const { user, jwtToken } = response;
		yield put(actions.updateLoginUser({ user, jwtToken }));
	} catch (err) {
		if (err.status === 401) {
			NotificationManager.error('Invalid email or password', 'Error', 4000);
		} else {
			throw err;
		}
	}
}

export function* watchUserLogin() {
	yield takeEvery(actionTypes.TRIGGER_LOGIN_USER, logInRequest);
}

export default function* authSaga() {
	yield all([watchUserLogin()]);
}
