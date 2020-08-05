import { ProjectsState } from '../containers/Projects/logic/state';
import { AuthState } from './../containers/LoginPage/logic/state';
import { ExampleState } from 'containers/Example/logic/state';
import { FilterState } from 'containers/Filters/logic/state';

export interface RootState {
	example: ExampleState;
	filters: FilterState;
	projects: ProjectsState;
	auth: AuthState;
}
