import { userReducer } from 'containers/ProfilePage/logiс/reducer';
import { exampleReducer } from 'containers/Example/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { RootState } from 'typings/rootState';

const rootReducer: Reducer<RootState> = combineReducers({
	example: exampleReducer,
	user: userReducer,
});

export default rootReducer;
