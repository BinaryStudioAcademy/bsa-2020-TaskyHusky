import { NotificationManager } from 'react-notifications';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import { addLabel, updateLabel, deleteLabel } from 'services/projects.service';
import * as actionTypes from './actionTypes';
import * as projectSettingsActions from './../../ProjectSettings/logic/actions';
import * as actions from './actions';

export function* addingLabel({ project, label }: ReturnType<typeof actions.startAddingLabel>) {
	try {
		const updatedProject = yield call(addLabel, { label, project });
		yield put(actions.successAddingLabel());
		yield put(projectSettingsActions.updateProject({ project: updatedProject }));
		NotificationManager.success('Label has been created', 'Success', 5000);
	} catch (error) {
		yield put(actions.failAddingLabel());
		NotificationManager.error(error.statusText, 'Fail', 5000);
	}
}

export function* watchAddingLabel() {
	yield takeEvery(actionTypes.START_ADDING_LABEL, addingLabel);
}

export function* updatingLabel({ project, label }: ReturnType<typeof actions.startAddingLabel>) {
	try {
		const updatedProject = yield call(updateLabel, { label, project });
		yield put(actions.successUpdatingLabel());
		yield put(projectSettingsActions.updateProject({ project: updatedProject }));
		NotificationManager.success('Label has been updated', 'Success', 5000);
	} catch (error) {
		yield put(actions.failAddingLabel());
		NotificationManager.error(error.statusText, 'Fail', 5000);
	}
}

export function* watchUpdatingLabel() {
	yield takeEvery(actionTypes.START_UPDATING_LABEL, updatingLabel);
}

export function* deletingLabel({ projectId, labelId }: ReturnType<typeof actions.startAddingLabel>) {
	try {
		const updatedProject = yield call(deleteLabel, { labelId, projectId });
		yield put(actions.successDeletingLabel());
		yield put(projectSettingsActions.updateProject({ project: updatedProject }));
		NotificationManager.success('Label has been deleted', 'Success', 5000);
	} catch (error) {
		yield put(actions.failAddingLabel());
		NotificationManager.error(error.statusText, 'Fail', 5000);
	}
}

export function* watchDeletingLabel() {
	yield takeEvery(actionTypes.START_DELETING_LABEL, deletingLabel);
}

export default function* projectLabelSaga() {
	yield all([watchAddingLabel(), watchUpdatingLabel(), watchDeletingLabel()]);
}
