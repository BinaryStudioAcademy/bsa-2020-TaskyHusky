export interface PartialIssue {
	id?: string;
	type?: string;
	status?: string;
	summary?: string;
	boardColumn?: string;
	labels?: string[];
	attachments?: string[];
	links?: string[];
	priority?: number;
	description?: string;
	board?: string;
	sprint?: string | null;
	project?: string;
	issueKey?: string;
	assigned?: string;
	creator?: string;
	index?: number;
	watchers?: string[];
	storyPoint?: number;
	completedAt?: Date;
}

export interface PartialIssueComment {
	text?: string;
}
