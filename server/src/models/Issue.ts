import { Sprint } from '../entity/Sprint';
import { Projects } from '../entity/Projects';

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
	sprint?: Sprint;
	project?: Projects;
	issueKey?: string;
	assignedID?: string;
	creatorID?: string;
}
