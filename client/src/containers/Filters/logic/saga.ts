import { fetchFilters, fetchFilterParts } from 'services/filter.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* fetchAllFilters(action: ReturnType<typeof actions.fetchFilters>) {
	console.log('filters');
	const filters: WebApi.Entities.Filter[] = yield call(fetchFilters);
	console.log(filters);

	yield put(actions.fetchFiltersSuccess({ partialState: { filters } }));
}

export function* fetchAllFilterParts(action: ReturnType<typeof actions.fetchFilterParts>) {
	const filterParts: WebApi.Entities.Filter[] = yield call(fetchFilterParts);
	yield put(actions.fetchFilterPartsSuccess({ partialState: { filterParts } }));
}

export function* watchFetchFilters() {
	yield takeEvery(actionTypes.FETCH_FILTERS, fetchAllFilters);
}

export function* watchFetchFilterParts() {
	yield takeEvery(actionTypes.FETCH_FILTER_PARTS, fetchAllFilterParts);
}

export default function* filterSaga() {
	yield all([watchFetchFilters(), watchFetchFilterParts()]);
}
