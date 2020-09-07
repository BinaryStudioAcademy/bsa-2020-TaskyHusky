import { NotificationManager } from 'react-notifications';
import { getProjectById, updateProject, requestUdateAvatar } from 'services/projects.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import i18next from 'i18next';

export function* fetchProject({ id }: ReturnType<typeof actions.startGettingProject>) {
	try {
		const project = yield call(getProjectById, id);
		yield put(actions.successGettingProject({ project }));
	} catch (error) {
		yield put(actions.failGettingProject());
	}
}

function* updateProjectAvatar(action: ReturnType<typeof actions.requestUpdateProjectAvatar>) {
	const { image, id } = action;
	try {
		const project = yield call(requestUdateAvatar, image, id);
		yield put(actions.successUpdatingProject({ project }));
		NotificationManager.success(i18next.t('avatar_was_updated'), i18next.t('success'), 4000);
	} catch (error) {
		NotificationManager.error(i18next.t('could_not_update_avatar'), i18next.t('error'), 4000);
	}
}

function* watchGetProject() {
	yield takeEvery(actionTypes.START_GETTING_PROJECT, fetchProject);
}

export function* updatingProject({ project }: ReturnType<typeof actions.startUpdatingProject>) {
	try {
		const updatedProject = yield call(updateProject, project);
		yield put(actions.successUpdatingProject({ project: updatedProject }));
		NotificationManager.success('Project data has been updated', 'Notification', 5000);
	} catch (error) {
		yield put(actions.failUpdatingProject());
		NotificationManager.error(error.statusText, 'Update project', 5000);
	}
}

function* watchUpdatingProject() {
	yield takeEvery(actionTypes.START_UPDATING_PROJECT, updatingProject);
}

function* watchUpdateProjectAvatar() {
	yield takeEvery(actionTypes.REQUEST_UPDATE_AVATAR, updateProjectAvatar);
}

export default function* projectSaga() {
	yield all([watchGetProject(), watchUpdatingProject(), watchUpdateProjectAvatar()]);
}
