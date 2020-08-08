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
