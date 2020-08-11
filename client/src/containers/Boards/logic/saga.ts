import * as service from 'services/board.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* fetchBoards() {
	const boards = yield call(service.getBoards);
	yield put(actions.successLoading({ boards }));
}

export function* watchStartLoading() {
	yield takeEvery(actionTypes.START_LOADING, fetchBoards);
}

export function* getRecentBoards() {
	const recentBoards = yield call(service.getRecentBoards);
	yield put(actions.successGetRecentBoards({ recentBoards }));
}

export function* watchGetRecentBoards() {
	yield takeEvery(actionTypes.GET_RECENT_BOARDS, getRecentBoards);
}

export function* deleteBoard(action: ReturnType<typeof actions.deleteBoard>) {
	yield call(service.deleteBoard, action.id);
	yield put(actions.startLoading());
}

export function* watchDeleteBoard() {
	yield takeEvery(actionTypes.DELETE_BOARD, deleteBoard);
}

export function* createBoard(action: ReturnType<typeof actions.createBoard>) {
	const { type, ...board } = action;
	yield call(service.createBoard, {
		...board,
	});
	yield put(actions.startLoading());
}

export function* watchCreateBoard() {
	yield takeEvery(actionTypes.CREATE_BOARD, createBoard);
}

export default function* boardsSaga() {
	yield all([watchStartLoading(), watchDeleteBoard(), watchCreateBoard(), watchGetRecentBoards()]);
}
