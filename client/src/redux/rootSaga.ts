import { all } from 'redux-saga/effects';
import projectsSaga from 'containers/Projects/logic/saga';
import authSaga from 'containers/LoginPage/logic/saga';

export default function* rootSaga() {
	yield all([projectsSaga(), authSaga()]);
}
