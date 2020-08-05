import { all } from 'redux-saga/effects';
import exampleSaga from 'containers/Example/logic/saga';
import filtersSaga from 'containers/Filters/logic/saga';
import projectsSaga from 'containers/Projects/logic/saga';
import authSaga from 'containers/LoginPage/logic/saga';

export default function* rootSaga() {
	yield all([exampleSaga(), projectsSaga(), authSaga(), filtersSaga()]);
}
