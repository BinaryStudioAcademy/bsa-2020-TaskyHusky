import React, { useEffect } from 'react';
import { Input } from 'semantic-ui-react';
import { RootState } from 'typings/rootState';
import { DropdownTextSearch, DropdownCheckboxSearch } from '../DropdownComponents/index';
import { useSelector, useDispatch } from 'react-redux';
import { startLoading } from 'containers/Projects/logic/actions';
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
	const { projects } = useSelector((rootState: RootState) => rootState.projects);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(startLoading());
	}, [dispatch]);

	const projectsToDropdownData = (project: { name: string; id: string }) => {
		const { id, name } = project;
		const data = {
			value: name,
			key: id,
			text: name,
		};
		return data;
	};

	const data = projects.map(projectsToDropdownData);

	return <DropdownCheckboxSearch data={data} members={filterPart.members} title={filterPart.filterDef.title} />;
};

export const IssueTypeFilter = ({ filterPart }: ProjectsFilterProps) => {
	// const { issueTypes } = useSelector((rootState: RootState) => rootState.issueTypes);

	const issueTypes = [
		{
			name: 'issueTypes1',
			id: 'issueTypes1',
			title: 'Task',
			color: 'green',
			icon: 'close',
		},
		{
			name: 'issueTypes2',
			id: 'issueTypes2',
			title: 'Task',
			color: 'green',
			icon: 'check',
		},
		{
			id: 'issueTypes3',
			title: 'Task',
			color: 'green',
			icon: 'check',
		},
		{
			id: 'issueTypes4',
			title: 'Bug',
			color: 'red',
			icon: 'close',
		},
		{
			id: 'issueTypes5',
			title: 'Story',
			color: 'teal',
			icon: 'file text',
		},
		{
			id: 'issueTypes6',
			title: 'Story',
			color: 'red',
			icon: 'file text',
		},
	];

	const issueTypesToDropdownData = (issueType: { id: string; title: string; color: string; icon: string }) => {
		const { id, title, color, icon } = issueType;
		const data = {
			value: title,
			key: id,
			text: title,
			icon,
			color,
		};
		return data;
	};

	const data = issueTypes.map(issueTypesToDropdownData);

	return <DropdownCheckboxSearch data={data} members={filterPart.members} title={filterPart.filterDef.title} />;
};

export const IssueStatusFilter = ({ filterPart }: ProjectsFilterProps) => {
	return <DropdownCheckboxSearch data={[]} members={filterPart.members} title={filterPart.filterDef.title} />;
};

export const AssigneeFilter = ({ filterPart }: ProjectsFilterProps) => {
	return <DropdownCheckboxSearch data={[]} members={filterPart.members} title={filterPart.filterDef.title} />;
};

export const CreatorFilter = ({ filterPart }: ProjectsFilterProps) => {
	return <DropdownCheckboxSearch data={[]} members={filterPart.members} title={filterPart.filterDef.title} />;
};

export const DescriptionFilter = ({ filterPart }: ProjectsFilterProps) => {
	return <DropdownTextSearch data={[]} searchText={filterPart.searchText} title={filterPart.filterDef.title} />;
};

export const SearchInput = () => <Input icon="search" placeholder={'Search by ..'} />;
