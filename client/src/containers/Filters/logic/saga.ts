import { fetchFilters, fetchFilterParts, updateFilter } from 'services/filter.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* fetchAllFilters(action: ReturnType<typeof actions.fetchFilters>) {
	try {
		const filters: WebApi.Entities.Filter[] = yield call(fetchFilters);
		yield put(actions.fetchFiltersSuccess({ partialState: { filters } }));
	} catch (e) {
		console.error(e.message);
		yield put(actions.fetchFiltersSuccess({ partialState: { filters: [] } }));
	}
}

export function* fetchAllFilterDefs(action: ReturnType<typeof actions.fetchFilterDefs>) {
	try {
		const filterDefs: WebApi.Entities.FilterDefinition[] = yield call(fetchFilters);
		yield put(actions.fetchFilterDefsSuccess({ partialState: { filterDefs } }));
	} catch (e) {
		console.error(e.message);
		yield put(actions.fetchFiltersSuccess({ partialState: { filterDefs: [] } }));
	}
}

export function* fetchAllFilterParts(action: ReturnType<typeof actions.fetchFilterParts>) {
	try {
		const filterParts: WebApi.Entities.FilterPart[] = yield call(fetchFilterParts);
		yield put(actions.fetchFilterPartsSuccess({ partialState: { filterParts } }));
	} catch (e) {
		console.error(e.message);
		yield put(actions.fetchFiltersSuccess({ partialState: { filterParts: [] } }));
	}
}

export function* updateFilterByData(action: ReturnType<typeof actions.updateFilter>) {
	try {
		const { data } = action;
		const filter: WebApi.Entities.Filter = yield call((data) => updateFilter(data), data);
		yield put(actions.updateFilterSuccess({ filter }));
	} catch (e) {
		console.error(e.message);
		yield put(actions.fetchFiltersSuccess({ partialState: { filterParts: [] } }));
	}
}

export function* watchUpdateFilter() {
	yield takeEvery(actionTypes.UPDATE_FILTER, updateFilterByData);
}

export function* watchFetchFilters() {
	yield takeEvery(actionTypes.FETCH_FILTERS, fetchAllFilters);
}

export function* watchFetchFilterParts() {
	yield takeEvery(actionTypes.FETCH_FILTER_PARTS, fetchAllFilterParts);
}

export function* watchFetchFilterDefs() {
	yield takeEvery(actionTypes.FETCH_FILTER_DEFS, fetchAllFilterDefs);
}

export default function* filterSaga() {
	yield all([watchFetchFilters(), watchFetchFilterParts(), watchFetchFilterDefs(), watchUpdateFilter()]);
}
