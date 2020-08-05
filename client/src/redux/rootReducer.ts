import { projectsReducer } from '../containers/Projects/logic/reducer';
import { authReducer } from 'containers/LoginPage/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { RootState } from 'typings/rootState';
import { issueReducer } from 'pages/CreateIssue/logic/reducer';

const rootReducer: Reducer<RootState> = combineReducers({
	projects: projectsReducer,
	auth: authReducer,
	issues: issueReducer,
});

export default rootReducer;
