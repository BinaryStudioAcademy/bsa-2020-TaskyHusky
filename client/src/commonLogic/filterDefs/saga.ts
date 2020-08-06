import { fetchFilterDefs } from 'services/filter.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* fetchAllFilterDefs(action: ReturnType<typeof actions.fetchFilterDefs>) {
	try {
		const filterDefs: WebApi.Entities.FilterDefinition[] = yield call(fetchFilterDefs);
		yield put(actions.updateFilterDefsSuccess({ partialState: { filterDefs } }));
	} catch (e) {
		console.error(e.message);
		yield put(actions.updateFilterDefsSuccess({ partialState: { filterDefs: [] } }));
	}
}

export function* watchFetchFilterDefs() {
	yield takeEvery(actionTypes.FETCH_FILTER_DEFS, fetchAllFilterDefs);
}

export default function* filterDefsSaga() {
	yield all([watchFetchFilterDefs()]);
}
