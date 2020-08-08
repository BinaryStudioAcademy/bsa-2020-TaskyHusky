import { createProject } from 'services/projects.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { startLoading } from './../../Projects/logic/actions';

export function* createNewProject(project: ReturnType<typeof actions.startCreatingProject>) {
	try {
		yield call(createProject, project);
		yield put(actions.successCreatingProject());
		yield put(startLoading());
	} catch (error) {
		console.log('error', error);
	}
}

export function* watchStartCreateNewProject() {
	yield takeEvery(actionTypes.START_CREATING_PROJECT, createNewProject);
}

export default function* createProjectSaga() {
	yield all([watchStartCreateNewProject()]);
}
