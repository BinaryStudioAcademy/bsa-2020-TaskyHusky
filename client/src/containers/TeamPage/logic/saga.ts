import { getTeam } from 'services/team.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* fetchTeam(id: any) {
	const team = yield call(getTeam, id);
	console.log(team);
	yield put(actions.successLoading(team));
}

export function* watchStartLoading() {
	yield takeEvery(actionTypes.START_LOADING, fetchTeam);
}

export default function* teamSaga() {
	yield all([watchStartLoading()]);
}
