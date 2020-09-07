import { NotificationManager } from 'react-notifications';
import { getProjects, getRecentProjects } from 'services/projects.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* fetchProjects() {
	try {
		const projects = yield call(getProjects);
		yield put(actions.SuccessLoading({ projects }));
	} catch (error) {
		yield put(actions.failLoading());
		NotificationManager.error(error.statusText, 'Error', 5000);
	}
}

export function* watchStartLoading() {
	yield takeEvery(actionTypes.START_LOADING, fetchProjects);
}

export function* fetchRecent() {
	try {
		const projects = yield call(getRecentProjects);
		yield put(actions.successLoadingRecent({ projects }));
	} catch (err) {
		NotificationManager.error("Can't get recent projects", 'Error', 5000);
	}
}

export function* watchStartLoadingRecent() {
	yield takeEvery(actionTypes.START_LOADING_RECENT, fetchRecent);
}

export default function* projectsSaga() {
	yield all([watchStartLoading(), watchStartLoadingRecent()]);
}
