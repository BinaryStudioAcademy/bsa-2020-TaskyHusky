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
	sprint?: Sprint;
	project?: Projects;
	issueKey?: string;
	assigned?: string;
	creator: string;
}
