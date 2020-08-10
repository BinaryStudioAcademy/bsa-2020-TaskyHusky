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
		createdBy: {
			id: string;
			firstName: string;
			lastName: string;
			avatar: string;
		};
	}
}

namespace WebApi.Issue {
	interface PartialIssue {
		id?: string;
		type: string;
		summary?: string;
		boardColumnID?: string;
		labels?: string[];
		attachments?: string[];
		links?: string[];
		priority: string;
		description?: string;
		sprintID?: string;
		projectID?: string;
		issueKey?: string;
		assignedID?: string;
		creatorID?: string;
	}
}

namespace WebApi.Result {
	interface UserAuthResult {
		user: {
			id: string;
			email: string;
		};
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
		boardColumnID?: string;
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
}

namespace WebApi.Team {
	export interface TeamModel {
		id?: string;
		description?: string;
		links?: string[];
	}
}

namespace WebApi.User {
	export interface UserModel {
		id?: string;
		email: string;
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
		filtres?: string[];
	}
}

namespace WebApi.Entities {
	interface Board {
		id: string;
		boardType: BoardType;
		name: string;
		columns?: BoardColumn[];
		createdBy: UserProfile;
	}

	interface BoardColumn {
		id: string;
		columnName?: string;
		status?: string;
		isResolutionSet?: boolean;
		board: Board;
	}

	interface Filter {
		id: string;
		owner?: UserProfile;
		ownerId?: string;
		name?: string;
		staredBy?: UserProfile[];
	}

	interface FilterDefinition {
		id: string;
		filterType?: string;
		dataType?: string;
		title?: string;
	}

	interface FilterPart {
		id: string;
		filterId?: string;
		filterDefId?: string;
		members?: UserProfile[];
		searchText?: string;
	}

	interface Issue {
		id: string;
		type?: IssueType;
		summary?: string;
		boardColumnID?: string;
		labels?: string;
		attachments?: string;
		links?: string;
		priority?: Priority;
		description?: string;
		sprintID?: string;
		projectID?: string;
		issueKey?: string;
		assignedID?: string;
		creatorID?: string;
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
		icon?: string;
		color?: string;
		title?: string;
		issues?: Issue[];
	}

	interface Projects {
		id: string;
		name: string;
		key: string;
		category?: string;
		defaultAssigneeID?: string;
		leadID?: string;
		creatorID: string;
	}

	interface Teams {
		id: string;
		teamId?: TeamsPeople[];
		description?: string;
		links?: string;
	}

	interface TeamsPeople {
		id: string;
		userId?: UserProfile;
		teamId?: Teams;
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
		teams?: TeamsPeople[];
		boards?: Board[];
		filters?: Filter[];
	}
}
