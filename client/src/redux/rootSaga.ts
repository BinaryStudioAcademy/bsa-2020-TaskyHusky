import { all } from 'redux-saga/effects';
import projectsSaga from 'containers/Projects/logic/saga';
import authSaga from 'containers/LoginPage/logic/saga';
import issueSaga from 'pages/CreateIssue/logic/saga';

export default function* rootSaga() {
	yield all([projectsSaga(), authSaga(), issueSaga()]);
}
