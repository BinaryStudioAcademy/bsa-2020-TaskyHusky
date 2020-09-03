import { saveFilter } from 'services/filter.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { fetchFilters } from '../../Filters/logic/actions';
import { NotificationManager } from 'react-notifications';
import i18next from 'i18next';

export function* saveNewFilter(action: ReturnType<typeof actions.startSavingFilter>) {
	const { name, owner, filterParts } = action;

	try {
		const { id } = yield call(saveFilter, { name, owner, filterParts });
		yield put(actions.successSavingFilter({ id }));
		yield put(actions.setRedirecting({ redirecting: true }));
		yield put(actions.resetState());
		yield put(fetchFilters());
		NotificationManager.success(i18next.t('filter_was_saved'), i18next.t('success'), 4000);
	} catch (error) {
		NotificationManager.error(i18next.t('could_not_save_filter'), i18next.t('error'), 4000);
	}
}

export function* watchStartSaveNewFilter() {
	yield takeEvery(actionTypes.START_SAVING_FILTER, saveNewFilter);
}

export default function* saveFilterSaga() {
	yield all([watchStartSaveNewFilter()]);
}
