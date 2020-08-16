import { getBoardSprints } from 'services/board.service';
import { all, put, takeEvery, call, take } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { NotificationManager } from 'react-notifications';

export function* loadSprintsRequest(action: ReturnType<typeof actions.loadSprintsTrigger>) {
	try {
		const { boardId } = action;

		const response: WebApi.Entities.Sprint[] = yield call(getBoardSprints, boardId);
		console.log('saga loadSprintsRequest', response);

		yield put(actions.loadSprintsSuccess({ sprints: response }));
	} catch (error) {
		NotificationManager.error(error.clientException.message, 'Error');
	}
}

export function* watchLoadSprintsRequest() {
	yield takeEvery(actionTypes.LOAD_SPRINTS_TRIGGER, loadSprintsRequest);
}

export default function* scrumBoardSaga() {
	yield all([watchLoadSprintsRequest()]);
}
