import { all } from 'redux-saga/effects';
import filtersSaga from 'containers/Filters/logic/saga';
import projectsSaga from 'containers/Projects/logic/saga';
import authSaga from 'containers/LoginPage/logic/saga';
import advancedSearchSaga from 'containers/AdvancedSearch/logic/saga';
import issueSaga from 'pages/CreateIssue/logic/saga';
import filterDefsSaga from 'commonLogic/filterDefs/saga';
import createProjectSaga from 'containers/CreateProjectModal/logic/saga';

export default function* rootSaga() {
	yield all([
		projectsSaga(),
		createProjectSaga(),
		authSaga(),
		issueSaga(),
		filtersSaga(),
		filterDefsSaga(),
		advancedSearchSaga(),
	]);
}
