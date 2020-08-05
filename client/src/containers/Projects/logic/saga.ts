import { getProjects } from 'services/projects.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* fetchProjects() {
	const projects = yield call(getProjects);
	yield put(actions.successLoading({ projects }));
}

export function* watchStartLoading() {
	yield takeEvery(actionTypes.START_LOADING, fetchProjects);
}

export default function* projectsSaga() {
	yield all([watchStartLoading()]);
}
