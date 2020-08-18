import { getBoardSprints } from 'services/board.service';
import { getSprintIssues } from 'services/sprint.service';
import { deleteSprint } from 'services/sprint.service';
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
		yield call(deleteSprint, sprintId);
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

export function* watchLoadSprintsRequest() {
	yield takeEvery(actionTypes.LOAD_SPRINTS_TRIGGER, loadSprintsRequest);
}

export function* watchDeleteSprintRequest() {
	yield takeEvery(actionTypes.DELETE_SPRINT_TRIGGER, deleteSprintRequest);
}

export function* watchLoadIssueRequest() {
	yield takeEvery(actionTypes.LOAD_ISSUES_TRIGGER, loadIssuesRequest);
}

export default function* scrumBoardSaga() {
	yield all([watchLoadSprintsRequest(), watchDeleteSprintRequest(), watchLoadIssueRequest()]);
}
