import { FilterPartState } from './state';

type Filter = {
	issueType?: string[];
	issueStatus?: string[];
	priority?: string[];
	sprint?: string[];
	projects?: string[];
	assigned?: string[];
	creator?: string[];
	summary?: string;
	description?: string;
	comment?: string;
};

export const getFilterOptionsFromFilterParts = (filterParts: FilterPartState[]) => {
	const filter: Filter = {};
	filterParts.forEach(({ members, filterDef, searchText }) => {
		const { filterType } = filterDef;
		const hasMembers = members.length > 0 || searchText;
		if (filterType === 'issueType' && hasMembers) {
			filter.issueType = members;
		}
		if (filterType === 'priority' && hasMembers) {
			filter.priority = members;
		}
		if (filterType === 'summary' && hasMembers) {
			filter.summary = searchText;
		}
		if (filterType === 'description' && hasMembers) {
			filter.description = searchText;
		}
		if (filterType === 'projects' && hasMembers) {
			filter.projects = members;
		}
		if (filterType === 'issueStatus' && hasMembers) {
			filter.issueStatus = members;
		}
		if (filterType === 'assigned' && hasMembers) {
			filter.assigned = members;
		}
		if (filterType === 'creator' && hasMembers) {
			filter.creator = members;
		}
		if (filterType === 'comment' && hasMembers) {
			filter.comment = searchText;
		}
	});

	return filter;
};
