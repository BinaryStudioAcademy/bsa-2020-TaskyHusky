import { saveFilter } from 'services/filter.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { fetchFilters } from '../../Filters/logic/actions';

export function* saveNewFilter(action: ReturnType<typeof actions.startSavingFilter>) {
	const { name, owner, filterParts } = action;

	try {
		const { id } = yield call(saveFilter, { name, owner, filterParts });
		yield put(actions.successSavingFilter({ id }));
		yield put(actions.setRedirecting({ redirecting: true }));
		yield put(actions.resetState());
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
