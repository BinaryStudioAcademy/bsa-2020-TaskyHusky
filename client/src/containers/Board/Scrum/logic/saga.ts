import { createIssue } from 'pages/IssuePage/logic/actions';
import { getBoardSprints, getBoardProjects } from 'services/board.service';
import { getSprintIssues, updateSprint, deleteSprint, createSprint } from 'services/sprint.service';
import { getBacklogByBoardId } from 'services/issue.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { NotificationManager } from 'react-notifications';
import { CREATE_ISSUE_SUCCESS } from 'pages/IssuePage/logic/actionTypes';

export function* loadSprintsRequest(action: ReturnType<typeof actions.loadSprintsTrigger>) {
	try {
		const { boardId } = action;
		const response: WebApi.Entities.Sprint[] = yield call(getBoardSprints, boardId);
		yield put(actions.loadSprintsSuccess({ sprints: response }));
	} catch (error) {
		NotificationManager.error(error.clientException.message, 'Error');
	}
}

export function* deleteSprintRequest(action: ReturnType<typeof actions.deleteSprintTrigger>) {
	try {
		const { sprintId } = action;
		const response: WebApi.Entities.Sprint = yield call(deleteSprint, sprintId);
		yield put(actions.deleteSprintSuccess({ sprint: response }));
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
		const response: WebApi.Entities.Sprint = yield call(createSprint, sprint);
		yield put(actions.createSprintSuccess({ sprint: response }));
		NotificationManager.success('Sprint was successfully created', 'Success');
	} catch (error) {
		NotificationManager.error(error.clientException.message, 'Error');
	}
}

export function* loadProjectRequest(action: ReturnType<typeof actions.loadProjectTrigger>) {
	try {
		const { boardId } = action;
		const [response]: WebApi.Entities.Projects[] = yield call(getBoardProjects, boardId);
		yield put(actions.loadProjectSuccess({ project: response }));
	} catch (error) {
		NotificationManager.error(error.clientException.message, 'Error');
	}
}

export function* createIssueSuccess(action: ReturnType<typeof createIssue>) {
	try {
		const {
			data: { sprint: sprintId, board: boardId },
		}: { data: { sprint?: string; board?: string } } = action;

		if (sprintId) {
			yield put(actions.loadIssuesTrigger({ sprintId }));
		}

		if (!sprintId && boardId) {
			yield put(actions.loadBacklogTrigger({ boardId: boardId }));
		}
	} catch (error) {
		NotificationManager.error(error.clientException.message, 'Error');
	}
}

export function* loadBacklogRequest(action: ReturnType<typeof actions.loadBacklogTrigger>) {
	try {
		const { boardId } = action;
		const response: WebApi.Entities.Issue[] = yield call(getBacklogByBoardId, boardId);
		yield put(actions.loadBacklogSuccess({ backlog: response }));
	} catch (error) {
		NotificationManager.error(error.clientException.message, 'Error');
	}
}

export function* deleteSprintSuccess(action: ReturnType<typeof actions.deleteSprintSuccess>) {
	try {
		const { sprint } = action;

		if (sprint.board) {
			yield put(actions.loadBacklogTrigger({ boardId: sprint.board.id }));
		}
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

export function* watchLoadProjectRequest() {
	yield takeEvery(actionTypes.LOAD_PROJECT_TRIGGER, loadProjectRequest);
}

export function* watchCreateSprintRequest() {
	yield takeEvery(actionTypes.CREATE_SPRINT_TRIGGER, createSprintRequest);
}

export function* watchCreateIssueSuccess() {
	yield takeEvery(CREATE_ISSUE_SUCCESS, createIssueSuccess);
}

export function* watchLoadBacklogRequest() {
	yield takeEvery(actionTypes.LOAD_BACKLOG_TRIGGER, loadBacklogRequest);
}

export function* watchDeleteSprintSuccess() {
	yield takeEvery(actionTypes.DELETE_SPRINT_SUCCESS, deleteSprintSuccess);
}

export default function* scrumBoardSaga() {
	yield all([
		watchLoadSprintsRequest(),
		watchDeleteSprintRequest(),
		watchLoadIssueRequest(),
		watchUpdateSprintRequest(),
		watchCreateSprintRequest(),
		watchLoadProjectRequest(),
		watchCreateIssueSuccess(),
		watchLoadBacklogRequest(),
		watchDeleteSprintSuccess(),
	]);
}
