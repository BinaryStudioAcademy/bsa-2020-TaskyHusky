import { getProject } from 'services/projects.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* fetchProject({ id }: ReturnType<typeof actions.startGettingProject>) {
	const project = yield call(getProject, id);
	yield put(actions.successGettingProject({ project }));
}

export function* watchGetProject() {
	yield takeEvery(actionTypes.START_GETTING_PROJECT, fetchProject);
}

export default function* projectSaga() {
	yield all([watchGetProject()]);
}
