namespace WebApi.Board {
	export enum BoardType {
		Scrum = 'Scrum',
		Kanban = 'Kanban',
	}
	export interface IBoardModel {
		id: string;
		boardType: BoardType;
		name: string;
		location: string;
		createdAt: Date;
		createdBy: {
			id: string;
			firstName: string;
			lastName: string;
			avatar: string;
		};
	}
	export interface IReducedBoard {
		id: string;
		name: string;
	}
}

namespace WebApi.Issue {
	interface PartialIssue {
		id?: string;
		type: string;
		summary?: string;
		boardColumn?: string;
		labels?: string[];
		attachments?: string[];
		links?: string[];
		priority: string;
		description?: string;
		sprint?: Sprint;
		project?: Projects;
		issueKey?: string;
		assigned?: string;
		creator: string;
	}
	export interface PartialIssueComment {
		text?: string;
	}
}

namespace WebApi.Result {
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
		createdDate?: Date;
		updatedDate?: Date;
		deletedDate?: Date;
	}
}

namespace WebApi.Sprint {
	interface SprintModel {
		id: string;
		sprintName: string;
		isActive: boolean;
		isCompleted: boolean;
		project: string;
		board: string;
		issues: string[];
	}
}

namespace WebApi.Team {
	export interface TeamModel {
		id?: string;
		name?: string;
		description?: string;
		color?: string;
		createdBy: UserProfile;
		links?: string[];
		users?: UserProfile[];
	}
}

namespace WebApi.User {
	export interface UserModel {
		googleId?: string;
		id: string;
		email: string;
		password?: string;
		lastName: string;
		firstName: string;
		username?: string;
		avatar?: string;
		location?: string;
		department?: string;
		organization?: string;
		jobTitle?: string;
		userSettingsId?: string;
		teams?: Team[];
		resetPasswordToken?: string | null;
		resetPasswordExpires?: Date | null;
		filtres?: string[];
		projects?: [];
	}
}

namespace WebApi.Entities {
	interface Board {
		id: string;
		boardType: BoardType;
		name: string;
		columns?: BoardColumn[];
		sprints?: Sprint[];
		createdBy: UserProfile;
		createdAt: Date;
		projects?: Projects[];
	}

	interface BoardColumn {
		id: string;
		columnName?: string;
		status?: string;
		isResolutionSet?: boolean;
		board: Board;
		issues: Issue[];
	}

	interface Filter {
		id: string;
		owner?: UserProfile;
		filterParts?: FilterPart[];
		name: string;
		staredBy?: UserProfile[];
	}

	interface FilterDefinition {
		id: number;
		filterParts?: FilterPart[];
		filterType: string;
		dataType: string;
		title: string;
	}

	interface FilterPart {
		id: string;
		filter?: Filter;
		filterDef: FilterDefinition;
		members?: string[];
		searchText?: string;
	}

	interface Issue {
		id: string;
		type?: IssueType;
		status?: IssueStatus;
		summary?: string;
		boardColumn?: BoardColumn;
		labels?: string;
		attachments?: string;
		links?: string;
		priority?: Priority;
		description?: string;
		sprint?: Sprint;
		project?: Projects;
		issueKey?: string;
		assigned?: UserProfile;
		creator: UserProfile;
		createdAt?: Date;
		updatedAt?: Date;
	}

	interface IssueComment {
		id: string;
		text: string;
		createdAt: Date;
		editedAt?: Date;
		issue: Issue;
		creator: UserProfile;
	}

	interface IssueStatus {
		id: string;
		color?: string;
		title?: string;
		issues?: Issue[];
	}

	interface IssueType {
		id: string;
		icon?: string;
		color?: string;
		title?: string;
		issues?: Issue[];
	}

	interface Priority {
		id: string;
		icon: string;
		color: string;
		title: string;
		issues?: Issue[];
	}

	interface Projects {
		id: string;
		name: string;
		key: string;
		description?: string;
		icon?: string;
		url?: string;
		category?: string;
		sprints?: Sprint[];
		boards?: Board[];
		defaultAssignee?: UserProfile;
		lead: UserProfile;
		creator: UserProfile;
		team?: Team;
		issues?: Issue[];
		users: UserProfile[];
		createdDate?: Date;
		updatedDate?: Date;
		deletedDate?: Date;
	}

	interface Sprint {
		id: string;
		sprintName: string;
		project?: Projects;
		board?: Board;
		isActive: boolean;
		isCompleted: boolean;
		issues: Issue[];
	}

	interface Team {
		id: string;
		description?: string;
		links?: string[];
		users?: UserProfile[];
		createdBy: UserProfile;
		projects?: Projects[];
		name?: string;
		color?: string;
	}

	interface UserProfile {
		id: string;
		googleId?: string;
		firstName?: string;
		lastName?: string;
		username?: string;
		avatar?: string;
		department?: string;
		location?: string;
		organization?: string;
		email?: string;
		jobTitle?: string;
		userSettingsId?: string;
		password?: string;
		boards?: Board[];
		public resetPasswordToken?: string | null;
		public resetPasswordExpires?: Date | null;
		filters?: Filter[];
		assignedProjects?: Projects[];
		leadedProjects?: Projects[];
		createdProjects?: Projects[];
		teamsOwner?: Team[];
		assignedIssues?: Issue[];
		createdIssues?: Issue[];
		teams?: Team[];
		projects?: Projects[];
		incomingInvites?: UserProfile[];
		pendingInvites?: UserProfile[];
		teammates?: UserProfile[];
	}
}
