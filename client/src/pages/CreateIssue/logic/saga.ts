import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getTypes, getPriorities } from 'services/issue.service';
import { setTypes, setPriorities } from './actions';
import * as actionTypes from './actionTypes';

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

export default function* issueSaga() {
	yield all([watchLoadIssueTypes(), watchLoadPriorities()]);
}
