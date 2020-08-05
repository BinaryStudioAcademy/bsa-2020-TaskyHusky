import { all } from 'redux-saga/effects';
import exampleSaga from 'containers/Example/logic/saga';
import authSaga from 'containers/LoginPage/logic/saga';

export default function* rootSaga() {
	yield all([exampleSaga(), authSaga()]);
}
