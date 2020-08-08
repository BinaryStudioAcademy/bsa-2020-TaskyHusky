import {
	SearchInput,
	ProjectsFilter,
	IssueTypeFilter,
	IssueStatusFilter,
	AssigneeFilter,
	CreatorFilter,
	DescriptionFilter,
} from './FilterComponents';

export const getByFilterType = (filterType: string) => {
	switch (filterType) {
		case 'comment':
			return SearchInput;
		case 'projects':
			return ProjectsFilter;
		case 'issueTypes':
			return IssueTypeFilter;
		case 'issueStatus':
			return IssueStatusFilter;
		case 'assignee':
			return AssigneeFilter;
		case 'creator':
			return CreatorFilter;
		case 'description':
			return DescriptionFilter;
		default:
			return null;
	}
};
