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
