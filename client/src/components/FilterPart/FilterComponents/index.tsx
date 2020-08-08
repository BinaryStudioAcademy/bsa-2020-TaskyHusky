import React from 'react';
import { Input } from 'semantic-ui-react';
import { DropdownTextSearch, DropdownSearch } from '../DropdownComponents/index';

interface FilterPartState {
	id: string;
	members: string[];
	searchText: string;
	filterDef: WebApi.Entities.FilterDefinition;
}

type ProjectsFilterProps = {
	filterPart: FilterPartState;
};
export const ProjectsFilter = ({ filterPart }: ProjectsFilterProps) => {
	const projects = [
		{
			name: 'project1',
			id: 'project1',
		},
		{
			name: 'project2',
			id: 'project2',
		},
	];

	const projectsToDropdownData = (project: { name: string; id: string }) => {
		const { id, name } = project;
		const data = {
			value: 'project',
			key: id,
			text: name,
		};
		return data;
	};

	const data = projects.map(projectsToDropdownData);

	return <DropdownSearch data={data} members={filterPart.members} title={filterPart.filterDef.title} />;
};

export const IssueTypeFilter = ({ filterPart }: ProjectsFilterProps) => {
	const issueTypes = [
		{
			name: 'issueTypes1',
			id: 'issueTypes1',
		},
		{
			name: 'issueTypes2',
			id: 'issueTypes2',
		},
	];

	const issueTypesToDropdownData = (issueType: { name: string; id: string }) => {
		const { id, name } = issueType;
		const data = {
			value: 'issueType',
			key: id,
			text: name,
		};
		return data;
	};

	const data = issueTypes.map(issueTypesToDropdownData);

	return <DropdownSearch data={data} members={filterPart.members} title={filterPart.filterDef.title} />;
};

export const IssueStatusFilter = ({ filterPart }: ProjectsFilterProps) => {
	return <DropdownSearch data={[]} members={filterPart.members} title={filterPart.filterDef.title} />;
};

export const AssigneeFilter = ({ filterPart }: ProjectsFilterProps) => {
	return <DropdownSearch data={[]} members={filterPart.members} title={filterPart.filterDef.title} />;
};

export const CreatorFilter = ({ filterPart }: ProjectsFilterProps) => {
	return <DropdownSearch data={[]} members={filterPart.members} title={filterPart.filterDef.title} />;
};

export const DescriptionFilter = ({ filterPart }: ProjectsFilterProps) => {
	return <DropdownTextSearch data={[]} searchText={filterPart.searchText} title={filterPart.filterDef.title} />;
};

export const SearchInput = () => <Input icon="search" placeholder={'Search by ..'} />;
