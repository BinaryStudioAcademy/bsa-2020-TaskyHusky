import { projectLabelReducer } from './../containers/ProjectLabels/logic/reducer';
import { projectPeopleReducer } from './../containers/ProjectPeople/logic/reducer';
import { projectCommonReducer } from 'components/ProjectsCommon/logic/reducer';
import { projectReducer } from 'containers/ProjectSettings/logic/reducer';
import { createProjectReducer } from 'containers/CreateProjectModal/logic/reducer';
import { userProfileReducer } from 'containers/ProfilePage/logiс/reducer';
import { projectsReducer } from 'containers/Projects/logic/reducer';
import { filtersReducer } from 'containers/Filters/logic/reducer';
import { authReducer } from 'containers/LoginPage/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { RootState } from 'typings/rootState';
import { teamReducer } from 'containers/TeamPage/logic/reducer';
import { issueReducer } from 'pages/IssuePage/logic/reducer';
import { filterDefsReducer } from 'commonLogic/filterDefs/reducer';
import { saveFilterReducer } from './../containers/SaveFilterModal/logic/reducer';
import { usersReducer } from 'commonLogic/users/reducer';
import { advancedSearchReducer } from 'containers/AdvancedSearch/logic/reducer';
import { peoplePageReducer } from '../containers/People/logic/reducer';
import { boardReducer } from '../containers/Boards/logic/reducer';
import { headerReducer } from '../containers/Header/logic/reducer';
import { scrumBoardReducer } from 'containers/Board/Scrum/logic/reducer';
import { notificationsReducer } from 'components/NotificationsMenu/logic/reducer';
import { reportReducer } from 'containers/Report/logic/reducer';
import { userActivityReducer } from 'containers/WorkPage/logic/reducer';
import { boardColumnReducer } from 'containers/BoardColumn/logic/reducer';

const rootReducer: Reducer<RootState> = combineReducers({
	boards: boardReducer,
	user: userProfileReducer,
	projects: projectsReducer,
	project: projectReducer,
	projectLabel: projectLabelReducer,
	projectPeople: projectPeopleReducer,
	projectCommon: projectCommonReducer,
	createProject: createProjectReducer,
	auth: authReducer,
	issues: issueReducer,
	filters: filtersReducer,
	filterDefs: filterDefsReducer,
	team: teamReducer,
	saveFilter: saveFilterReducer,
	users: usersReducer,
	advancedSearch: advancedSearchReducer,
	scrumBoard: scrumBoardReducer,
	peoplePage: peoplePageReducer,
	header: headerReducer,
	notifications: notificationsReducer,
	report: reportReducer,
	userActivity: userActivityReducer,
	boardColumn: boardColumnReducer,
});

export default rootReducer;
