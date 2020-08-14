import { all } from 'redux-saga/effects';
import userSaga from 'containers/ProfilePage/logiс/saga';
import filtersSaga from 'containers/Filters/logic/saga';
import projectsSaga from 'containers/Projects/logic/saga';
import authSaga from 'containers/LoginPage/logic/saga';
import advancedSearchSaga from 'containers/AdvancedSearch/logic/saga';
import filterDefsSaga from 'commonLogic/filterDefs/saga';
import createProjectSaga from 'containers/CreateProjectModal/logic/saga';
import teamSaga from 'containers/TeamPage/logic/saga';
import saveFilterSaga from 'containers/SaveFilterModal/logic/saga';
import usersSaga from 'commonLogic/users/saga';
import issueSaga from 'pages/IssuePage/logic/saga';
import projectSaga from 'containers/ProjectSettings/logic/saga';
import peoplePageSaga from 'containers/People/logic/saga';

export default function* rootSaga() {
	yield all([
		projectsSaga(),
		projectSaga(),
		createProjectSaga(),
		authSaga(),
		issueSaga(),
		filtersSaga(),
		filterDefsSaga(),
		teamSaga(),
		advancedSearchSaga(),
		userSaga(),
		saveFilterSaga(),
		usersSaga(),
		peoplePageSaga(),
	]);
}
