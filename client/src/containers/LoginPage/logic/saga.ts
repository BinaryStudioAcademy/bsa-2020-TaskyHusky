import { loginUser } from 'services/auth.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* fetchUserLogin(action: ReturnType<typeof actions.triggerLoginUser>) {
	const { email, password } = action;

	const user: WebApi.Result.UserLoginResult = yield call(loginUser, email, password);

	yield put(actions.updateLoginUser(user));
}

export function* watchUserLogin() {
	yield takeEvery(actionTypes.TRIGGER_LOGIN_USER, fetchUserLogin);
}
export default function* authSaga() {
	yield all([watchUserLogin()]);
}
