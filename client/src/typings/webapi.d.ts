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
}

namespace WebApi.Team {
	export interface TeamModel {
		id?: string;
		name?: string;
		description?: string;
		links?: string[];
		users?: [];
	}
}

namespace WebApi.User {
	export interface UserModel {
		id?: string;
		email?: string;
		password?: string;
		lastName?: string;
		firstName?: string;
		username?: string;
		avatar?: string;
		location?: string;
		department?: string;
		organization?: string;
		jobTitle?: string;
		userSettingsId?: string;
		resetPasswordToken: string | null;
		resetPasswordExpires: Date | null;
		teams?: [];
		filtres?: string[];
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
		filterDef?: FilterDefinition;
		members?: UserProfile[];
		searchText?: string;
	}

	interface Issue {
		id: string;
		type?: IssueType;
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
	}

	interface IssueComment {
		id: string;
		text: string;
		createdAt: Date;
		editedAt?: Date;
		issue: Issue;
		creator: UserProfile;
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
		category?: string;
		sprints?: Sprint[];
		boards?: Board[];
		defaultAssignee?: UserProfile;
		lead?: UserProfile;
		creator: UserProfile;
		issues?: Issue[];
		users?: UserProfile[];
	}

	interface Sprint {
		id: string;
		sprintName?: string;
		project?: Projects;
		board?: Board;
		isActive?: boolean;
		isCompleted?: boolean;
		issues?: Issue[];
	}

	interface Team {
		id: string;
		description?: string;
		links?: string[];
		users?: UserProfile[];
		createdBy?: UserProfile;
		name?: string;
		color?: string;
	}

	interface Teams {
		id: string;
		users?: UserProfile[];
		createdBy?: UserProfile;
		name?: string;
		color?: string;
		description?: string;
		links?: string[];
	}

	interface UserProfile {
		id: string;
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
		createdProjects: Projects[];
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
