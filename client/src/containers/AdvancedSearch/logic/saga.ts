import { RootState } from 'typings/rootState';
import { loadIssues } from 'services/issue.service';
import { loadFilterById } from 'services/filter.service';
import { all, put, takeEvery, call, select } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { FilterPartState } from './state';
import { AnyAction } from 'redux';
import { getFilterOptionsFromFilterParts } from './helpers';

export function* fetchFilterPartsSaga(action: AnyAction) {
	const {
		filterDefs: { filterDefs },
	}: RootState = yield select();

	const getInitialFilterPart = (filterDef: WebApi.Entities.FilterDefinition): FilterPartState => {
		return { id: `${uuidv4()}`, filterDef, searchText: '', members: [] };
	};

	const filterParts = filterDefs.map(getInitialFilterPart);

	yield put(actions.updateSearchSuccess({ partialState: { filterParts } }));
	if (action.id) {
		const filter: WebApi.Entities.Filter = yield call(loadFilterById, action.id);

		yield put(actions.loadFilterByIdSuccess({ filter }));
	}
	yield put(actions.loadIssues());
}

export function* updateFilterPartSaga(action: AnyAction) {
	yield put(actions.updateFilterPartSuccess({ filterPart: action.filterPart }));
	yield put(actions.loadIssues());
}

export function* loadIssuesSaga(action: AnyAction) {
	const {
		advancedSearch: { filterParts },
	}: RootState = yield select();

	const filterOption = getFilterOptionsFromFilterParts(filterParts);
	const issues = yield call(loadIssues, filterOption);

	yield put(actions.loadIssuesSuccess({ issues }));
}

export function* loadFilterByIdSaga(action: AnyAction) {
	const filter: WebApi.Entities.Filter = yield call(loadFilterById, action.id);

	yield put(actions.loadFilterByIdSuccess({ filter }));
	yield put(actions.loadIssues());
}

export function* setAddedFilterPartsSaga(action: AnyAction) {
	const { addedFilterParts } = action;
	yield put(actions.updateSearchSuccess({ partialState: { addedFilterParts } }));
}

export function* watchFetchFilterParts() {
	yield takeEvery(actionTypes.FETCH_FILTER_PARTS, fetchFilterPartsSaga);
}

export function* watchUpdateFilterPart() {
	yield takeEvery(actionTypes.UPDATE_FILTER_PART, updateFilterPartSaga);
}

export function* watchLoadIssues() {
	yield takeEvery(actionTypes.LOAD_ISSUES, loadIssuesSaga);
}

export function* watchLoadFilterById() {
	yield takeEvery(actionTypes.LOAD_FILTER, loadFilterByIdSaga);
}

export function* watchSetAddedFilterParts() {
	yield takeEvery(actionTypes.SET_ADDED_FILTER_PARTS, setAddedFilterPartsSaga);
}

export default function* advancedSearchSaga() {
	yield all([
		watchFetchFilterParts(),
		watchUpdateFilterPart(),
		watchLoadIssues(),
		// watchLoadFilterById(),
		watchSetAddedFilterParts(),
	]);
}
