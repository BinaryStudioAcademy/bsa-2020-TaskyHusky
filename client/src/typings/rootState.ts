import { ProjectsState } from '../containers/Projects/logic/state';
import { AuthState } from './../containers/LoginPage/logic/state';
import { IssueState } from 'pages/CreateIssue/logic/types';
import { CreateProjectsState } from 'containers/CreateProjectModal/logic/state';

export interface RootState {
	projects: ProjectsState;
	createProject: CreateProjectsState;
	auth: AuthState;
	issues: IssueState;
}
