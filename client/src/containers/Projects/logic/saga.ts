import { NotificationManager } from 'react-notifications';
import { getProjects } from 'services/projects.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* fetchProjects() {
	try {
		const projects = yield call(getProjects);
		yield put(actions.SuccessLoading({ projects }));
	} catch (error) {
		yield put(actions.failLoading());
		NotificationManager.error(error.statusText, 'Fail', 5000);
	}
}

export function* watchStartLoading() {
	yield takeEvery(actionTypes.START_LOADING, fetchProjects);
}

export default function* projectsSaga() {
	yield all([watchStartLoading()]);
}
