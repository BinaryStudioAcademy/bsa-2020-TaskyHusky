import { ProjectsState } from '../containers/Projects/logic/state';
import { AuthState } from './../containers/LoginPage/logic/state';
import { IssueState } from 'pages/CreateIssue/logic/types';

export interface RootState {
	projects: ProjectsState;
	auth: AuthState;
	issues: IssueState;
}
