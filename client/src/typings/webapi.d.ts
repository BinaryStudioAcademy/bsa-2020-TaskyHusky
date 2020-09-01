namespace WebApi.Board {
	export enum BoardType {
		Scrum = 'Scrum',
		Kanban = 'Kanban',
	}
	interface IBoardModel {
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
	interface IReducedBoard {
		id: string;
		name: string;
	}
}

namespace WebApi.IO {
	export enum IssueActions {
		CreateIssue = 'ISSUE:CREATE',
		UpdateIssue = 'ISSUE:UPDATE',
		DeleteIssue = 'ISSUE:DELETE',
		CommentIssue = 'ISSUE:COMMENT:ADD',
		UpdateIssueComment = 'ISSUE:COMMENT:UPDATE',
		DeleteIssueComment = 'ISSUE:COMMENT:DELETE',
	}
	export enum NotificationActions {
		CreateNotification = 'NOTIFICATION:CREATE',
		ViewNotification = 'NOTIFICATION:VIEW',
		UnviewNotification = 'NOTIFICATION:UNVIEW',
		ViewAllNotifications = 'NOTIFICATION:ALL:VIEW',
	}
	export enum Types {
		Issue = 'ISSUE',
		Notification = 'NOTIFICATION',
	}
}

namespace WebApi.Issue {
	interface PartialIssue {
		id?: string;
		type?: string;
		status?: string;
		summary?: string;
		boardColumn?: string;
		labels?: string[];
		attachments?: string[];
		links?: string[];
		priority?: string;
		description?: string;
		board?: string;
		sprint?: string | null;
		project?: string;
		issueKey?: string;
		assigned?: string;
		creator?: string;
		watchers?: string[];
		storyPoint?: number;
	}
	interface PartialIssueComment {
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
		status?: {
			id: string;
			color: string;
			title: string;
		};
		summary?: string;
		boardColumn?: BoardColumnResult;
		labels?: string[];
		attachments?: string[];
		links?: string[];
		board?: BoardResult;
		priority: {
			id: string;
			color: string;
			title: string;
			icon: string;
		};
		description?: string;
		sprint?: Sprint;
		project?: Projects;
		issueKey?: string;
		watchers?: UserModel[];
		assigned?: UserModel;
		creator: UserModel;
		storyPoint?: number;
		createdAt: Date;
		updatedAt?: Date;
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
		githubUrl?: string;
		createdDate?: Date;
		updatedDate?: Date;
		deletedDate?: Date;
	}
	interface CommitFileResult {
		sha: string;
		additions: number;
		deletions: number;
		filename: string;
	}
	interface CommitResult {
		hash: string;
		message: string;
		author: string;
		avatar: string;
		time: Date;
		files: Array<CommitFileResult>;
	}
	interface NotificationResult {
		id: string;
		title?: string;
		link?: string;
		user: UserModel;
		text: string;
		isViewed: boolean;
		createdAt: Date;
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
		startDate: Date;
		endDate: Date;
	}
}

namespace WebApi.Team {
	interface TeamModel {
		id: string;
		name?: string;
		description?: string;
		color?: string;
		createdBy: UserProfile;
		links?: string[];
		users?: UserProfile[];
		projects?: Projects[];
	}
}

namespace WebApi.User {
	export enum jobTitle {
		dbAdmin = 'Database administrator',
		backEndDev = 'Back-end developer',
		frontEndDev = 'Front-end developer',
		fullStackDev = 'Full-Stack developer',
	}
	interface UserModel {
		googleId?: string;
		id: string;
		email: string;
		password?: string;
		lastName?: string;
		firstName?: string;
		username?: string;
		avatar?: string;
		location?: string;
		department?: string;
		organization?: string;
		jobTitle?: jobTitle;
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
		issues?: Issue[];
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
		type: IssueType;
		status?: IssueStatus;
		summary: string;
		boardColumn?: BoardColumn;
		board?: Board;
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
		watchers?: UserProfile[];
		createdAt?: Date;
		updatedAt?: Date;
		storyPoint?: number;
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
		color: string;
		title: string;
		issues?: Issue[];
	}

	interface IssueType {
		id: string;
		icon: string;
		color: string;
		title: string;
		issues?: Issue[];
	}

	interface Notification {
		id: string;
		title?: string;
		link?: string;
		text: string;
		isViewed: boolean;
		user: UserProfile;
		createdAt: Date;
	}

	interface Priority {
		id: string;
		icon: string;
		color: string;
		title: string;
		issues?: Issue[];
	}

	interface ProjectLabel {
		id: string;
		text: string;
		textColor: string;
		backgroundColor: string;
		project: Projects;
		createdDate?: Date;
		deletedDate?: Date;
	}

	interface Projects {
		id: string;
		name: string;
		key: string;
		description?: string;
		icon: string;
		url?: string;
		category?: string;
		sprints?: Sprint[];
		boards?: Board[];
		defaultAssignee?: UserProfile;
		lead: UserProfile;
		creator: UserProfile;
		team?: Team;
		issues?: Issue[];
		labels: ProjectLabel[];
		users: UserProfile[];
		githubUrl?: string;
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
		startDate?: Date;
		endDate?: Date;
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
		email: string;
		jobTitle?: string;
		userSettingsId?: string;
		password?: string;
		boards?: Board[];
		public resetPasswordToken?: string | null;
		public resetPasswordExpires?: Date | null;
		public resetEmailToken?: string | null;
		public resetEmailExpires?: Date | null;
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
		watchingIssues?: Issue[];
		notifications?: Notification[];
	}
}
