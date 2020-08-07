import { fetchFilterParts, fetchFilterDefs } from 'services/filter.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { FilterPartState } from './state';
const QUICK_FILTER_IDS = [
	'0ade4ebd-49f7-4c24-a7a8-3eb155733382',
	'4cc8d6d1-1566-4d2e-9b39-1f61d3912369',
	'666aab27-489e-4729-9ac7-95576323c42e',
];

export function* fetchAllFilterParts(action: ReturnType<typeof actions.fetchFilterParts>) {
	// const { filterDefs } = action; // TODO: uncomment when filterDefs will be in rootState with the start of application
	const filterDefs: WebApi.Entities.FilterDefinition[] = yield call(fetchFilterDefs);

	const getInitialFilterPart = (filterDef: WebApi.Entities.FilterDefinition): FilterPartState => {
		return { id: `${uuidv4()}`, filterDef, searchText: '', members: [] };
	};

	const getDefaultFilterDefsFromState = (): WebApi.Entities.FilterDefinition[] => {
		const defaultFilters = filterDefs.filter(({ id }) =>
			QUICK_FILTER_IDS.find((quickFilterId) => quickFilterId === id),
		);
		return defaultFilters;
	};

	const defaultFilterDefs = getDefaultFilterDefsFromState();

	const filterParts = defaultFilterDefs.map(getInitialFilterPart);

	// const filterParts: WebApi.Entities.FilterPart[] = yield call(fetchFilterParts);
	yield put(actions.updateSearchSuccess({ partialState: { filterParts } }));
}

export function* watchFetchFilterParts() {
	yield takeEvery(actionTypes.FETCH_FILTER_PARTS, fetchAllFilterParts);
}

export default function* advancedSearchSaga() {
	yield all([watchFetchFilterParts()]);
}
