import { fetchPeopleByFullNameFilter } from '../../../services/people.service';
import { fetchTeamsByNameFilter } from '../../../services/team.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* fetchPeopleSearchPage(action: ReturnType<typeof actions.startLoading>) {
	const { name, id } = action;

	const teams = yield call(fetchTeamsByNameFilter, name);
	const people = yield call(fetchPeopleByFullNameFilter, id, name);

	yield put(actions.SuccessLoading({ teams, people }));
}

export function* watchStartLoading() {
	yield takeEvery(actionTypes.START_LOADING, fetchPeopleSearchPage);
}

export default function* projectsSaga() {
	yield all([watchStartLoading()]);
}
