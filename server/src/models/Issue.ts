export interface PartialIssue {
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
}

export interface PartialIssueComment {
	text?: string;
}
