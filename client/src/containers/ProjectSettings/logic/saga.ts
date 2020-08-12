import { updateProject, deleteProject } from './../../../services/projects.service';
import { getProjectById } from 'services/projects.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* fetchProject({ id }: ReturnType<typeof actions.startGettingProject>) {
	const project = yield call(getProjectById, id);
	yield put(actions.successGettingProject({ project }));
}

function* watchGetProject() {
	yield takeEvery(actionTypes.START_GETTING_PROJECT, fetchProject);
}

export function* updatingProject({ project }: ReturnType<typeof actions.startUpdatingProject>) {
	const updatedProject = yield call(updateProject, project);
	yield put(actions.successUpdatingProject({ project: updatedProject }));
}

function* watchUpdatingProject() {
	yield takeEvery(actionTypes.START_UPDATING_PROJECT, updatingProject);
}

export function* deletingProject({ id }: ReturnType<typeof actions.startDeletingProject>) {
	yield call(deleteProject, { id });
	yield put(actions.successDeletingProject());
}

function* watchDeletingProject() {
	yield takeEvery(actionTypes.START_DELETING_PROJECT, deletingProject);
}

export default function* projectSaga() {
	yield all([watchGetProject(), watchUpdatingProject(), watchDeletingProject()]);
}
