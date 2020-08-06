import { CommonState } from '../commonLogic/state';
import { ProjectsState } from '../containers/Projects/logic/state';
import { AuthState } from './../containers/LoginPage/logic/state';
import { FilterState } from 'containers/Filters/logic/state';
import { IssueState } from 'pages/CreateIssue/logic/types';

export interface RootState {
	projects: ProjectsState;
	auth: AuthState;
	issues: IssueState;
	filters: FilterState;
	common: CommonState;
}
