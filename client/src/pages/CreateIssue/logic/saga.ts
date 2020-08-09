import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getTypes, getPriorities, createIssue, updateIssue } from 'services/issue.service';
import { setTypes, setPriorities } from './actions';
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

function* watchLoadPriorities() {
	yield takeEvery(actionTypes.LOAD_PRIORITIES, fetchPriorities);
}

function* fetchCreateIssue(action: AnyAction) {
	yield call(createIssue, action.data);
}

function* watchCreateIssue() {
	yield takeEvery(actionTypes.CREATE_ISSUE, fetchCreateIssue);
}

function* fetchUpdateIssue(action: AnyAction) {
	yield call(updateIssue, action.id, action.data);
}

function* watchUpdateIssue() {
	yield takeEvery(actionTypes.UPDATE_ISSUE, fetchUpdateIssue);
}

export default function* issueSaga() {
	yield all([watchLoadIssueTypes(), watchLoadPriorities(), watchCreateIssue(), watchUpdateIssue()]);
}
