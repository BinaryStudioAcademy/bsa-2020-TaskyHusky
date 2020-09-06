import { call, put, all, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';
import * as actionTypes from './actionTypes';
import { createBoardColumn } from 'services/boardColumn.service';

function* fetchCreateColumn(action: ReturnType<typeof actions.createColumn>) {
	const result = yield call(createBoardColumn, action.data);
	yield put(actions.setColumnCreated({ created: true, column: result }));
}

function* watchCreateColumn() {
	yield takeEvery(actionTypes.CREATE_COLUMN, fetchCreateColumn);
}

export default function* boardColumnSaga() {
	yield all([watchCreateColumn()]);
}
