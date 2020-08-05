import { ProjectsState } from '../containers/Projects/logic/state';
import { AuthState } from './../containers/LoginPage/logic/state';

export interface RootState {
	projects: ProjectsState;
	auth: AuthState;
}
