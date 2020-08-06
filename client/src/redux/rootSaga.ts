import { all } from 'redux-saga/effects';
import exampleSaga from 'containers/Example/logic/saga';
import userSaga from 'containers/ProfilePage/logiс/saga';

export default function* rootSaga() {
	yield all([exampleSaga(), userSaga()]);
}
