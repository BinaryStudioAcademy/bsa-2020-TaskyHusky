import { getSprintById } from '../../../services/sprint.service';
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

function* watchLoadSprintById() {
	yield takeEvery(actionTypes.LOAD_SPRINT, fetchSprint);
}

export default function* projectSaga() {
	yield all([watchLoadSprintById()]);
}
