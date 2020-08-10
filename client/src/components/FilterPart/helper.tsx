import {
	CommentFilter,
	ProjectsFilter,
	IssueTypeFilter,
	IssueStatusFilter,
	AssigneeFilter,
	CreatorFilter,
	DescriptionFilter,
	SummaryFilter,
} from './FilterComponents';

export const getByFilterType = (filterType: string) => {
	switch (filterType) {
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
		case 'comment':
			return CommentFilter;
		case 'summary':
			return SummaryFilter;
		default:
			return null;
	}
};
