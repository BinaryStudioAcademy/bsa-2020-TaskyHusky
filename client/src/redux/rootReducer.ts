import { projectReducer } from './../containers/ProjectSettings/logic/reducer';
import { createProjectReducer } from './../containers/CreateProjectModal/logic/reducer';
import { userProfileReducer } from 'containers/ProfilePage/logiс/reducer';
import { projectsReducer } from '../containers/Projects/logic/reducer';
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

const rootReducer: Reducer<RootState> = combineReducers({
	user: userProfileReducer,
	projects: projectsReducer,
	project: projectReducer,
	createProject: createProjectReducer,
	auth: authReducer,
	issues: issueReducer,
	filters: filtersReducer,
	filterDefs: filterDefsReducer,
	team: teamReducer,
	saveFilter: saveFilterReducer,
	users: usersReducer,
	advancedSearch: advancedSearchReducer,
	peoplePage: peoplePageReducer,
});

export default rootReducer;
