import { ProjectsState } from '../containers/Projects/logic/state';
import { ExampleState } from 'containers/Example/logic/state';

export interface RootState {
	example: ExampleState;
	projects: ProjectsState;
}
