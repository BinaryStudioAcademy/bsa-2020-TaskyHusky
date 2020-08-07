import { fetchFilterParts, fetchFilterDefs } from 'services/filter.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { FilterPartState } from './state';

export function* fetchFilterPartsSaga(action: ReturnType<typeof actions.fetchFilterParts>) {
	const filterDefs: WebApi.Entities.FilterDefinition[] = yield call(fetchFilterDefs);

	const getInitialFilterPart = (filterDef: WebApi.Entities.FilterDefinition): FilterPartState => {
		return { id: `${uuidv4()}`, filterDef, searchText: '', members: [] };
	};

	// const getDefaultFilterDefsFromState = (): WebApi.Entities.FilterDefinition[] => {
	// 	const defaultFilters = (filterDefs as WebApi.Entities.FilterDefinition[]).filter(({ id }) =>
	// 		QUICK_FILTER_IDS.find((quickFilterId) => quickFilterId === id),
	// 	);
	// 	return defaultFilters;
	// };

	// const defaultFilterDefs = getDefaultFilterDefsFromState();

	const filterParts = filterDefs.map(getInitialFilterPart);
	yield put(actions.updateSearchSuccess({ partialState: { filterParts } }));
}

export function* watchFetchFilterParts() {
	yield takeEvery(actionTypes.FETCH_FILTER_PARTS, fetchFilterPartsSaga);
}

export default function* advancedSearchSaga() {
	yield all([watchFetchFilterParts()]);
}
