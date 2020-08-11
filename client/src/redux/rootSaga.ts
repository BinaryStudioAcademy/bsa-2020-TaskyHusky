import { all } from 'redux-saga/effects';
import userSaga from 'containers/ProfilePage/logiс/saga';
import filtersSaga from 'containers/Filters/logic/saga';
import projectsSaga from 'containers/Projects/logic/saga';
import authSaga from 'containers/LoginPage/logic/saga';
import advancedSearchSaga from 'containers/AdvancedSearch/logic/saga';
import issueSaga from 'pages/CreateIssue/logic/saga';
import filterDefsSaga from 'commonLogic/filterDefs/saga';
import createProjectSaga from 'containers/CreateProjectModal/logic/saga';
import saveFilterSaga from 'containers/SaveFilterModal/logic/saga';
import usersSaga from 'commonLogic/users/saga';

export default function* rootSaga() {
	yield all([
		projectsSaga(),
		createProjectSaga(),
		authSaga(),
		issueSaga(),
		filtersSaga(),
		filterDefsSaga(),
		advancedSearchSaga(),
		userSaga(),
		saveFilterSaga(),
		usersSaga(),
	]);
}
