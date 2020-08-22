import { Sprint } from '../entity/Sprint';
import { Projects } from '../entity/Projects';

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
	sprint?: string;
	project?: string;
	issueKey?: string;
	assigned?: string;
	creator: string;
}

export interface PartialIssueComment {
	text?: string;
}
