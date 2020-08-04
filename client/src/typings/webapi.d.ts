namespace WebApi.Result {
	interface UserAuthResult {
		id: string;
		jwtToken: string;
		email: string;
	}

	interface User {
		id: string;
		firstName?: string;
		lastName?: string;
		avatar?: string;
		department?: string;
		timezone?: string;
		organization?: string;
		email?: string;
		jobTitle?: string;
		userSettingsId?: string;
		password?: string;
	}
	interface UserLoginResult {
		jwtToken: string;
		user: User;
	}
}

namespace WebApi.Entities {
	interface Example {
		id: string;
		name?: string;
		text?: string;
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
}
