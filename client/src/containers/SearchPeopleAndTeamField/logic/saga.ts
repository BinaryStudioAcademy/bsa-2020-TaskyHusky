import { all } from 'redux-saga/effects';
/*
export function* fetchPeopleSearchPage(action: ReturnType<typeof actions.startLoading>) {
	const { name } = action;

	const teams = yield call(fetchTeamsByNameFilter, name);
	const people = yield call(fetchPeopleByFullNameFilter, name);
	yield put(actions.SuccessLoading({ teams, people }));
}
*/
export function* watchStartLoading() {
	//	yield takeEvery(actionTypes.START_LOADING, fetchPeopleSearchPage);
}

export default function* projectsSaga() {
	yield all([watchStartLoading()]);
}
