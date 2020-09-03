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
import { NotificationManager } from 'react-notifications';
import i18next from 'i18next';

const PAGE_SIZE = 25;

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
		yield put(actions.loadIssues({}));
	}
}

export function* updateFilterPartSaga(action: AnyAction) {
	yield put(actions.updateFilterPartSuccess({ filterPart: action.filterPart }));
	yield put(actions.loadIssues({}));
}

export function* loadIssuesSaga(action: AnyAction) {
	const { from = 0, to = PAGE_SIZE, sort } = action;
	const {
		advancedSearch: { filterParts, inputText, filter },
	}: RootState = yield select();

	const updatedFilterParts = filterParts.map((filterPart) => {
		const updatedFilterPart = filter?.filterParts?.find(({ filterDef: { id } }) => id === filterPart.filterDef.id);
		return updatedFilterPart ? updatedFilterPart : filterPart;
	}) as FilterPartState[];

	const filterOption = getFilterOptionsFromFilterParts(updatedFilterParts);
	const result = yield call(loadIssuesAndCount, filterOption, from, to, sort, inputText);

	yield put(actions.loadIssuesSuccess({ issues: result[0], issuesCount: result[1] }));
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
	try {
		yield call(updateFilter, filter as WebApi.Entities.Filter);
		yield put(actions.updateFilterSuccess());
		NotificationManager.success(i18next.t('filter_was_updated'), i18next.t('success'), 4000);
	} catch (error) {
		NotificationManager.error(i18next.t('could_not_update_filter'), i18next.t('error'), 4000);
	}
}

export function* setInputTextSaga(action: AnyAction) {
	yield put(actions.loadIssues({}));
}

export function* watchSetInputText() {
	yield takeEvery(actionTypes.SET_INPUT_TEXT, setInputTextSaga);
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
		watchSetAddedFilterParts(),
		watchResetState(),
		watchUpdateFilter(),
		watchSetInputText(),
	]);
}
