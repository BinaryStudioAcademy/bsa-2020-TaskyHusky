import { getSprintById, getSprintIssues } from '../../../services/sprint.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* fetchSprint({ id }: ReturnType<typeof actions.loadSprintById>) {
	try {
		const sprint = yield call(getSprintById, id);
		yield put(actions.loadSprintByIdSuccess({ sprint }));
	} catch (error) {
		console.log('Error', error);
	}
}

export function* fetchSprintIssues({ id }: ReturnType<typeof actions.loadSprintById>) {
	try {
		const issues: WebApi.Result.IssueResult[] = yield call(getSprintIssues, id);
		yield put(actions.loadSprintIssuesSuccess({ issues }));
	} catch (error) {
		console.log('Error', error);
	}
}

function* watchLoadSprintById() {
	yield takeEvery(actionTypes.LOAD_SPRINT, fetchSprint);
}

function* watchLoadSprintIssues() {
	yield takeEvery(actionTypes.LOAD_SPRINT_ISSUES, fetchSprintIssues);
}

export default function* projectSaga() {
	yield all([watchLoadSprintById(), watchLoadSprintIssues()]);
}
