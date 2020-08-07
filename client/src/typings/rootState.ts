import { FilterDefsState } from '../commonLogic/filterDefs/state';
import { ProjectsState } from '../containers/Projects/logic/state';
import { AuthState } from './../containers/LoginPage/logic/state';
import { FilterState } from 'containers/Filters/logic/state';
import { AdvancedSearch } from 'containers/AdvancedSearch/logic/state';
import { IssueState } from 'pages/CreateIssue/logic/types';

export interface RootState {
	projects: ProjectsState;
	auth: AuthState;
	issues: IssueState;
	filters: FilterState;
	filterDefs: FilterDefsState;
	advancedSearch: AdvancedSearch;
}
