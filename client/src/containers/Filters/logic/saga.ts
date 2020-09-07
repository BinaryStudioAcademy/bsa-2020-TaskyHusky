import {
	fetchTeammatesFilters,
	fetchFilterParts,
	updateFilter,
	deleteFilter,
	getRecentFilters,
	getFavFilters,
} from 'services/filter.service';

import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { NotificationManager } from 'react-notifications';

export function* fetchAllFilters(action: ReturnType<typeof actions.fetchFilters>) {
	try {
		const filters: WebApi.Entities.Filter[] = action.userId ? yield call(fetchTeammatesFilters, action.userId) : [];
		yield put(actions.fetchFiltersSuccess({ partialState: { filters } }));
	} catch (e) {
		console.error(e.message);
		yield put(actions.fetchFiltersSuccess({ partialState: { filters: [] } }));
	}
}

export function* fetchAllFilterParts(action: ReturnType<typeof actions.fetchFilterParts>) {
	try {
		const filterParts: WebApi.Entities.FilterPart[] = yield call(fetchFilterParts);
		yield put(actions.fetchFiltersSuccess({ partialState: { filterParts } }));
	} catch (e) {
		console.error(e.message);
		yield put(actions.fetchFiltersSuccess({ partialState: { filterParts: [] } }));
	}
}

export function* updateFilterByData(action: ReturnType<typeof actions.updateFilter>) {
	try {
		const { data } = action;
		const filter: WebApi.Entities.Filter = yield call((data) => updateFilter(data), data);
		yield put(actions.updateFilterSuccess({ data: filter }));
	} catch (e) {
		console.error(e.message);
		yield put(actions.fetchFiltersSuccess({ partialState: { filterParts: [] } }));
	}
}

export function* fetchGetRecent() {
	try {
		const recent = yield call(getRecentFilters);
		yield put(actions.fetchRecentSuccess({ partialState: { recent } }));
	} catch (err) {
		NotificationManager.error("Can't get recent filters", 'Error', 5000);
	}
}

export function* fetchGetFav() {
	try {
		const favorite = yield call(getFavFilters);
		yield put(actions.fetchRecentSuccess({ partialState: { favorite } }));
	} catch (err) {
		NotificationManager.error("Can't get favorite filters", 'Error', 5000);
	}
}

export function* deleteFilterSaga({ id }: ReturnType<typeof actions.deleteFilter>) {
	yield call(deleteFilter, id);
	yield put(actions.deleteFilterSuccess({ id }));
}

export function* watchDeleteFilter() {
	yield takeEvery(actionTypes.DELETE_FILTER, deleteFilterSaga);
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

export function* watchGetRecent() {
	yield takeEvery(actionTypes.FETCH_RECENT_FILTERS, fetchGetRecent);
}

export function* watchGetFav() {
	yield takeEvery(actionTypes.FETCH_FAV_FILTERS, fetchGetFav);
}

export default function* filterSaga() {
	yield all([
		watchFetchFilters(),
		watchFetchFilterParts(),
		watchUpdateFilter(),
		watchDeleteFilter(),
		watchGetRecent(),
		watchGetFav(),
	]);
}
