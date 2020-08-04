import { fetchFilters } from 'services/filter.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

// export function* fetchExampleText(action: ReturnType<typeof actions.getExampleText>) {
// 	const { exampleName } = action;
// 	const { text }: WebApi.Entities.Example = yield call(fetchExample, exampleName);
// 	yield put(actions.updateExample({ partialState: { text } }));
// }
export function* fetchAllFilters(action: ReturnType<typeof actions.fetchFilters>) {
	const filters: WebApi.Entities.Filter[] = yield call(fetchFilters);
	yield put(actions.fetchFilters({ partialState: { filters } }));
}

// export function* watchUpdateExampleText() {
// 	yield takeEvery(actionTypes.TRIGGER_UPDATE_TEXT, fetchExampleText);
// }

export function* watchFetchFilters() {
	yield takeEvery(actionTypes.FETCH_FILTERS, fetchAllFilters);
}

export default function* filterSaga() {
	yield all([watchFetchFilters()]);
}
