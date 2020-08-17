import { fetchPeople } from '../../../services/people.service';
import { fetchTeams } from '../../../services/team.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* fetchPeoplePage() {
	const teams = yield call(fetchTeams);
	const people = yield call(fetchPeople);

	yield put(actions.SuccessLoading({ teams, people }));
}

export function* watchStartLoading() {
	yield takeEvery(actionTypes.START_LOADING, fetchPeoplePage);
}

export default function* projectsSaga() {
	yield all([watchStartLoading()]);
}
