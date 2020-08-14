import { saveFilter } from 'services/filter.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { fetchFilters } from './../../Filters/logic/actions';

export function* saveNewFilter(action: ReturnType<typeof actions.startSavingFilter>) {
	const { name, ownerId } = action;
	try {
		yield call(saveFilter, { name, ownerId });
		yield put(actions.successSavingFilter());
		yield put(fetchFilters());
	} catch (error) {
		console.log('error', error);
	}
}

export function* watchStartSaveNewFilter() {
	yield takeEvery(actionTypes.START_SAVING_FILTER, saveNewFilter);
}

export default function* saveFilterSaga() {
	yield all([watchStartSaveNewFilter()]);
}
