import { RootState } from 'typings/rootState';
import { loadIssuesAndCount } from 'services/issue.service';
import { loadFilterById, updateFilter } from 'services/filter.service';
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
	yield put(actions.loadIssues({}));
}

export function* updateFilterPartSaga(action: AnyAction) {
	yield put(actions.updateFilterPartSuccess({ filterPart: action.filterPart }));
	yield put(actions.loadIssues({}));
}

export function* loadIssuesSaga(action: AnyAction) {
	const { page } = action;
	const {
		advancedSearch: { filterParts },
	}: RootState = yield select();

	const filterOption = getFilterOptionsFromFilterParts(filterParts);
	const result = yield call(loadIssuesAndCount, filterOption, page);

	yield put(actions.loadIssuesSuccess({ issues: result[0], issuesCount: result[1] }));
}

export function* loadFilterByIdSaga(action: AnyAction) {
	const filter: WebApi.Entities.Filter = yield call(loadFilterById, action.id);

	yield put(actions.loadFilterByIdSuccess({ filter }));
	yield put(actions.loadIssues({}));
}

export function* setAddedFilterPartsSaga(action: AnyAction) {
	const { addedFilterParts } = action;
	yield put(actions.updateSearchSuccess({ partialState: { addedFilterParts } }));
}

export function* resetStateSaga(action: AnyAction) {
	const { id } = action;
	yield put(actions.fetchFilterParts({ id }));
}

export function* updateFilterSaga(action: AnyAction) {
	const {
		advancedSearch: { filter, filterParts },
	}: RootState = yield select();
	if (filter) {
		filter.filterParts = filterParts.filter(({ members, searchText }) => members.length > 0 || searchText);
	}
	yield call(updateFilter, filter as WebApi.Entities.Filter);
	yield put(actions.updateFilterSuccess());
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

export function* watchResetState() {
	yield takeEvery(actionTypes.RESET_STATE, resetStateSaga);
}

export function* watchUpdateFilter() {
	yield takeEvery(actionTypes.UPDATE_FILTER, updateFilterSaga);
}

export default function* advancedSearchSaga() {
	yield all([
		watchFetchFilterParts(),
		watchUpdateFilterPart(),
		watchLoadIssues(),
		watchLoadFilterById(),
		watchSetAddedFilterParts(),
		watchResetState(),
		watchUpdateFilter(),
	]);
}
