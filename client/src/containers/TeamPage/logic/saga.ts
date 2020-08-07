import { getTeam } from 'services/team.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
type Props = {
	id: string;
	type: string;
};
export function* fetchTeam(props: Props) {
	const team = yield call(getTeam, props.id);
	yield put(actions.successLoading({ team }));
}

export function* watchStartLoading() {
	yield takeEvery(actionTypes.START_LOADING, fetchTeam);
}

export default function* teamSaga() {
	yield all([watchStartLoading()]);
}
