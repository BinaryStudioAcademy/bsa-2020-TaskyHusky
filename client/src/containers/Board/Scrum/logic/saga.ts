import { useTranslation } from 'react-i18next';
import { getBoardSprints } from 'services/board.service';
import { getSprintIssues, updateSprint } from 'services/sprint.service';
import { deleteSprint, createSprint } from 'services/sprint.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { NotificationManager } from 'react-notifications';

export function* loadSprintsRequest(action: ReturnType<typeof actions.loadSprintsTrigger>) {
	try {
		const { boardId } = action;
		const response: WebApi.Entities.Sprint[] = yield call(getBoardSprints, boardId);
		yield put(actions.loadSprintsSuccess({ sprints: response }));
	} catch (error) {
		NotificationManager.error(error.clientException.message, 'Error');
	}
}

export function* deleteSprintRequest(action: any) {
	try {
		const { sprintId } = action;
		const response: WebApi.Entities.Sprint[] = yield call(deleteSprint, sprintId);
		yield put(actions.loadSprintsSuccess({ sprints: response }));
		NotificationManager.success('Sprint was deleted', 'Success');
	} catch (error) {
		NotificationManager.error(error.clientException.message, 'Error');
	}
}

export function* loadIssuesRequest(action: ReturnType<typeof actions.loadIssuesTrigger>) {
	try {
		const { sprintId } = action;
		const response: WebApi.Entities.Issue[] = yield call(getSprintIssues, sprintId);
		yield put(actions.loadIssuesSuccess({ issues: response, sprintId }));
	} catch (error) {
		NotificationManager.error(error.clientException.message, 'Error');
	}
}

export function* updateSprintRequest(action: ReturnType<typeof actions.updateSprintDataTrigger>) {
	try {
		const { sprint } = action;
		const response: any = yield call(updateSprint, sprint);
		yield put(actions.updateSprintDataSuccess({ sprint: response }));
		NotificationManager.success('Sprint was successfully updated', 'Success');
	} catch (error) {
		NotificationManager.error(error.clientException.message, 'Error');
	}
}

export function* createSprintRequest(action: ReturnType<typeof actions.createSprintTrigger>) {
	try {
		const { sprint } = action;
		const response: any = yield call(createSprint, sprint);
		console.log('saga response', response);
		yield put(actions.createSprintSuccess({ sprint: response }));
		NotificationManager.success('Sprint was successfully created', 'Success');
	} catch (error) {
		NotificationManager.error(error.clientException.message, 'Error');
	}
}

export function* watchLoadSprintsRequest() {
	yield takeEvery(actionTypes.LOAD_SPRINTS_TRIGGER, loadSprintsRequest);
}

export function* watchDeleteSprintRequest() {
	yield takeEvery(actionTypes.DELETE_SPRINT_TRIGGER, deleteSprintRequest);
}

export function* watchLoadIssueRequest() {
	yield takeEvery(actionTypes.LOAD_ISSUES_TRIGGER, loadIssuesRequest);
}

export function* watchUpdateSprintRequest() {
	yield takeEvery(actionTypes.UPDATE_SPRINT_DATA_TRIGGER, updateSprintRequest);
}

export function* watchCreateSprintRequest() {
	yield takeEvery(actionTypes.CREATE_SPRINT_TRIGGER, createSprintRequest);
}

export default function* scrumBoardSaga() {
	yield all([
		watchLoadSprintsRequest(),
		watchDeleteSprintRequest(),
		watchLoadIssueRequest(),
		watchUpdateSprintRequest(),
		watchCreateSprintRequest(),
	]);
}
