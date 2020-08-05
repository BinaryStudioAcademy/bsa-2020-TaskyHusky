import { projectsReducer } from '../containers/Projects/logic/reducer';
import { exampleReducer } from 'containers/Example/logic/reducer';
import { filtersReducer } from 'containers/Filters/logic/reducer';
import { authReducer } from 'containers/LoginPage/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { RootState } from 'typings/rootState';

const rootReducer: Reducer<RootState> = combineReducers({
	example: exampleReducer,
	filters: filtersReducer,
	projects: projectsReducer,
	auth: authReducer,
});

export default rootReducer;
