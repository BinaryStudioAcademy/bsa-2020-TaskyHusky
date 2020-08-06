import { all } from 'redux-saga/effects';
import filtersSaga from 'containers/Filters/logic/saga';
import projectsSaga from 'containers/Projects/logic/saga';
import authSaga from 'containers/LoginPage/logic/saga';
import issueSaga from 'pages/CreateIssue/logic/saga';
import filterDefsSaga from 'commonLogic/filterDefs/saga';

export default function* rootSaga() {
	yield all([projectsSaga(), authSaga(), issueSaga(), filtersSaga(), filterDefsSaga()]);
}
