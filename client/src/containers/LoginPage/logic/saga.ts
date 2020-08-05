import { loginUser } from 'services/auth.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* logInRequest(action: ReturnType<typeof actions.triggerLoginUser>) {
	const { email, password } = action;
	try {
		const response: WebApi.Result.UserLoginResult = yield call(loginUser, email, password);

		// If there is no user in DB - do not nothing, should be fixed (I guess we need error handler on client side)
		// Now if there is no user in DB -> server throws an error RangeError [ERR_HTTP_INVALID_STATUS_CODE]: Invalid status code: undefined
		if (response) {
			const { user, jwtToken } = response;
			yield put(actions.updateLoginUser({ user, jwtToken }));
		}
	} catch (e) {
		// parse error here
	}
}

export function* watchUserLogin() {
	yield takeEvery(actionTypes.TRIGGER_LOGIN_USER, logInRequest);
}
export default function* authSaga() {
	yield all([watchUserLogin()]);
}
