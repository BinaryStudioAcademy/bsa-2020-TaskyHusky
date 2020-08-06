import { getBoards } from 'services/board.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* fetchBoards() {
	const boards = yield call(getBoards);
	yield put(actions.successLoading({ boards }));
}

export function* watchStartLoading() {
	yield takeEvery(actionTypes.START_LOADING, fetchBoards);
}

export default function* boardsSaga() {
	yield all([watchStartLoading()]);
}
