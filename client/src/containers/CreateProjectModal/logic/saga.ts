import { NotificationManager } from 'react-notifications';
import { getAllKeys } from './../../../services/projects.service';
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
		NotificationManager.error(error.statusText, 'Create project', 3000);
	}
}

export function* watchStartCreateNewProject() {
	yield takeEvery(actionTypes.START_CREATING_PROJECT, createNewProject);
}

export function* getKeys() {
	try {
		const keys = yield call(getAllKeys);
		yield put(actions.successGettingKeys({ keys }));
	} catch (error) {
		yield put(actions.failGettingKeys());
		NotificationManager.error(error.statusText, 'Keys', 3000);
	}
}

export function* watchStartGettingKeys() {
	yield takeEvery(actionTypes.START_GETTING_KEYS, getKeys);
}

export default function* createProjectSaga() {
	yield all([watchStartCreateNewProject(), watchStartGettingKeys()]);
}
