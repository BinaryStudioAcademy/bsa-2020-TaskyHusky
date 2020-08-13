import {
	CommentFilter,
	ProjectsFilter,
	IssueTypeFilter,
	IssueStatusFilter,
	AssigneeFilter,
	CreatorFilter,
	DescriptionFilter,
	SummaryFilter,
	PriorityFilter,
} from './FilterComponents';

export const getByFilterType = (filterType: string) => {
	switch (filterType) {
		case 'projects':
			return ProjectsFilter;
		case 'issueTypes':
			return IssueTypeFilter;
		case 'assignee':
			return AssigneeFilter;
		case 'priority':
			return PriorityFilter;
		case 'issueStatus':
			return IssueStatusFilter;
		case 'creator':
			return CreatorFilter;
		case 'description':
			return DescriptionFilter;
		case 'comment':
			return CommentFilter;
		case 'summary':
			return SummaryFilter;
		default:
			return null;
	}
};
