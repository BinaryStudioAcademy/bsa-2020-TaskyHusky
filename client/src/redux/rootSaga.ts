import { all } from 'redux-saga/effects';
import exampleSaga from 'containers/Example/logic/saga';
import filtersSaga from 'containers/Filters/logic/saga';

export default function* rootSaga() {
	yield all([exampleSaga(), filtersSaga()]);
}
