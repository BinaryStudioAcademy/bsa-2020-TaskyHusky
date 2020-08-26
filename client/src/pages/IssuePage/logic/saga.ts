import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
	getTypes,
	getPriorities,
	createIssue,
	updateIssue,
	deleteIssue,
	getStatuses,
	watch,
} from 'services/issue.service';

import { setTypes, setPriorities, setStatuses, createIssueSuccess, updateIssueSuccess } from './actions';
import * as actionTypes from './actionTypes';
import { AnyAction } from 'redux';

function* fetchIssueTypes() {
	const types = yield call(getTypes);
	yield put(setTypes({ data: types }));
}

function* watchLoadIssueTypes() {
	yield takeEvery(actionTypes.LOAD_TYPES, fetchIssueTypes);
}

function* fetchPriorities() {
	const priorities = yield call(getPriorities);
	yield put(setPriorities({ data: priorities }));
}

function* fetchStatuses() {
	const statuses = yield call(getStatuses);
	yield put(setStatuses({ data: statuses }));
}

function* watchLoadPriorities() {
	yield takeEvery(actionTypes.LOAD_PRIORITIES, fetchPriorities);
}

function* watchLoadStatuses() {
	yield takeEvery(actionTypes.LOAD_STATUSES, fetchStatuses);
}

function* fetchCreateIssue(action: AnyAction) {
	yield call(createIssue, action.data);
	yield put(createIssueSuccess({ data: action.data }));
}

function* watchCreateIssue() {
	yield takeEvery(actionTypes.CREATE_ISSUE, fetchCreateIssue);
}

function* fetchUpdateIssue(action: AnyAction) {
	const response: WebApi.Entities.Issue = yield call(updateIssue, action.id, action.data);
	yield put(updateIssueSuccess({ data: response }));
}

function* deleteIssueSaga(action: AnyAction) {
	yield call(deleteIssue, action.id);
}

function* watchUpdateIssue() {
	yield takeEvery(actionTypes.UPDATE_ISSUE, fetchUpdateIssue);
}

function* watchDeleteIssue() {
	yield takeEvery(actionTypes.DELETE_ISSUE, deleteIssueSaga);
}

function* fetchWatchIssue(action: AnyAction) {
	yield call(watch, action.id);
}

function* watchWatchIssue() {
	yield takeEvery(actionTypes.WATCH_ISSUE, fetchWatchIssue);
}

export default function* issueSaga() {
	yield all([
		watchLoadIssueTypes(),
		watchLoadPriorities(),
		watchCreateIssue(),
		watchUpdateIssue(),
		watchDeleteIssue(),
		watchLoadStatuses(),
		watchWatchIssue(),
	]);
}
