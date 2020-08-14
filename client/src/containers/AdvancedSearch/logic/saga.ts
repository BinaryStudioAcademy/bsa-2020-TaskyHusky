import { fetchFilterDefs } from 'services/filter.service';
import { loadIssues } from 'services/issue.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { FilterPartState } from './state';
import { AnyAction } from 'redux';

export function* fetchFilterPartsSaga(action: ReturnType<typeof actions.fetchFilterParts>) {
	const filterDefs: WebApi.Entities.FilterDefinition[] = yield call(fetchFilterDefs);

	const getInitialFilterPart = (filterDef: WebApi.Entities.FilterDefinition): FilterPartState => {
		return { id: `${uuidv4()}`, filterDef, searchText: '', members: [] };
	};

	const filterParts = filterDefs.map(getInitialFilterPart);

	yield put(actions.updateSearchSuccess({ partialState: { filterParts } }));
}

export function* updateFilterPartSaga(action: AnyAction) {
	yield put(actions.updateFilterPartSuccess({ filterPart: action.filterPart }));
	// every time when update filterPart we should load issues
}

export function* loadIssuesSaga(action: AnyAction) {
	const { filter } = action;
	yield call(loadIssues, filter ? filter : {});
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

export default function* advancedSearchSaga() {
	yield all([watchFetchFilterParts(), watchUpdateFilterPart()]);
}
