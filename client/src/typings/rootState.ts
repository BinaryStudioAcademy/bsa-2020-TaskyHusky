import { ProjectsState } from '../containers/Projects/logic/state';
import { AuthState } from './../containers/LoginPage/logic/state';
import { IssueState } from 'pages/CreateIssue/logic/types';
import { BoardsState } from '../containers/Boards/logic/state';

export interface RootState {
	boards: BoardsState;
	projects: ProjectsState;
	auth: AuthState;
	issues: IssueState;
}
