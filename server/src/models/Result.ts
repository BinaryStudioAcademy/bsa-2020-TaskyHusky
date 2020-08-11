import { UserModel } from './User';

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
	sprintID?: string;
	projectID?: string;
	issueKey?: string;
	assignedID?: string;
	creatorID?: string;
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
