import { NotificationManager } from 'react-notifications';
import { getAllKeys } from './../../../services/projects.service';
import { createProject } from 'services/projects.service';
import { all, put, takeEvery, call, select } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { startLoading } from './../../Projects/logic/actions';
import { createBoard } from 'services/board.service';
import { boardTypes } from 'typings/boardTypes';

export function* createNewProject(project: ReturnType<typeof actions.startCreatingProject>) {
	try {
		const { id } = yield call(createProject, project);

		const {
			auth: {
				user: { id: userId },
			},
		} = yield select();

		yield call(createBoard, {
			projects: [id],
			name: project.name,
			boardType: project.template as boardTypes,
			createdBy: {
				id: userId,
			},
		});

		yield put(actions.successCreatingProject());
		yield put(startLoading());
	} catch (error) {
		NotificationManager.error(error.statusText, 'Create project', 3000);
		yield put(actions.resetState());
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
