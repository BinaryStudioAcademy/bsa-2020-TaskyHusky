import { projectsReducer } from '../containers/Projects/logic/reducer';
import { filtersReducer } from 'containers/Filters/logic/reducer';
import { authReducer } from 'containers/LoginPage/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { RootState } from 'typings/rootState';
import { issueReducer } from 'pages/CreateIssue/logic/reducer';
import { commonReducer } from 'commonLogic/reducer';

const rootReducer: Reducer<RootState> = combineReducers({
	projects: projectsReducer,
	auth: authReducer,
	issues: issueReducer,
	filters: filtersReducer,
	common: commonReducer,
});

export default rootReducer;
