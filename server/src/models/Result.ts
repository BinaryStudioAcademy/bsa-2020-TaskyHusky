import { UserModel } from './User';
import { Projects } from '../entity/Projects';

interface UserAuthResult {
	user: UserModel;
	jwtToken: string;
}

interface IssueResult {
	id: string;
	type: {
		id: string;
		color: string;
		title: string;
		icon: string;
	};
	summary?: string;
	boardColumn?: string;
	labels?: string[];
	attachments?: string[];
	links?: string[];
	priority: {
		id: string;
		color: string;
		title: string;
		icon: string;
	};
	description?: string;
	sprint?: SprintModel;
	project?: Projects;
	issueKey?: string;
	watchers?: UserModel[];
	assigned?: UserModel;
	creator: UserModel;
}

interface IssueCommentResult {
	id: string;
	creator: UserModel;
	createdAt: Date;
	updatedAt?: Date;
	text: string;
	issue: string;
}

interface BoardResult {
	id: string;
	boardType: 'Kanban' | 'Scrum';
	name: string;
	location: string;
	createdAt: {
		firstName: string;
		lastName?: string;
		id: string;
		avatar: string | null;
	};
}

interface BoardColumnResult {
	id: string;
	columnName: string;
	status: string;
	isResolutionSet: boolean;
	board: BoardResult;
}

interface ComposedBoardResult extends BoardResult {
	columns: BoardColumnResult[];
}

interface BoardProjectsResult {
	id: string;
	name: string;
	key: string;
	description?: string;
	icon?: string;
	category?: string;
	githubUrl: string;
	createdDate?: Date;
	updatedDate?: Date;
	deletedDate?: Date;
}
