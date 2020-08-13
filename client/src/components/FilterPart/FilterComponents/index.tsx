import React, { useEffect } from 'react';
import { RootState } from 'typings/rootState';
import { DropdownTextSearch, DropdownCheckboxSearch } from '../DropdownComponents/index';
import { useSelector, useDispatch } from 'react-redux';
import { startLoading } from 'containers/Projects/logic/actions';
import { FilterPartState } from 'containers/AdvancedSearch/logic/state';

type FilterProps = {
	filterPart: FilterPartState;
};

type DefinitionEntity = {
	id: string;
	title: string;
	icon: string;
	color: string;
};

const definitionTypesToDropdownData = (entity: DefinitionEntity) => {
	const { id, title, color, icon } = entity;
	const data = {
		value: title,
		key: id,
		text: title,
		icon,
		color,
	};
	return data;
};

export const ProjectsFilter = ({ filterPart }: FilterProps) => {
	const { projects } = useSelector((rootState: RootState) => rootState.projects);
	const dispatch = useDispatch();

	useEffect(() => {
		// recommended to load on app start
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

	return <DropdownCheckboxSearch data={data} filterPart={filterPart} />;
};

export const IssueTypeFilter = ({ filterPart }: FilterProps) => {
	const { types } = useSelector((rootState: RootState) => rootState.issues);

	const data = (types as DefinitionEntity[]).map(definitionTypesToDropdownData);

	return <DropdownCheckboxSearch data={data} filterPart={filterPart} />;
};

export const PriorityFilter = ({ filterPart }: FilterProps) => {
	const { priorities } = useSelector((rootState: RootState) => rootState.issues);

	const data = (priorities as DefinitionEntity[]).map(definitionTypesToDropdownData);

	return <DropdownCheckboxSearch data={data} filterPart={filterPart} />;
};

export const IssueStatusFilter = ({ filterPart }: FilterProps) => {
	// const { statuses } = useSelector((rootState: RootState) => rootState.issues);
	const statuses = [
		{
			id: '1',
			title: 'In progress',
			color: 'blue',
		},
		{
			id: '2',
			title: 'Done',
			color: 'green',
		},
	];
	const data = (statuses as DefinitionEntity[]).map(definitionTypesToDropdownData);

	return <DropdownCheckboxSearch data={data} filterPart={filterPart} />;
};

export const AssigneeFilter = ({ filterPart }: FilterProps) => {
	const { users } = useSelector((rootState: RootState) => rootState.users);

	const usersToDropdownData = (user: WebApi.Entities.UserProfile) => {
		const { id, firstName, lastName } = user;
		const fullName = `${firstName} ${lastName}`;
		const data = {
			value: fullName,
			key: id,
			text: fullName,
		};
		return data;
	};

	const data = users.map(usersToDropdownData);

	return <DropdownCheckboxSearch data={data} filterPart={filterPart} />;
};

export const CreatorFilter = ({ filterPart }: FilterProps) => {
	const { users } = useSelector((rootState: RootState) => rootState.users);

	const usersToDropdownData = (user: WebApi.Entities.UserProfile) => {
		const { id, firstName, lastName } = user;
		const fullName = `${firstName} ${lastName}`;
		const data = {
			value: fullName,
			key: id,
			text: fullName,
		};
		return data;
	};

	const data = users.map(usersToDropdownData);

	return <DropdownCheckboxSearch data={data} filterPart={filterPart} />;
};

export const DescriptionFilter = ({ filterPart }: FilterProps) => {
	return <DropdownTextSearch data={[]} searchText={filterPart.searchText} title={filterPart.filterDef.title} />;
};

export const CommentFilter = ({ filterPart }: FilterProps) => {
	return <DropdownTextSearch data={[]} searchText={filterPart.searchText} title={filterPart.filterDef.title} />;
};

export const SummaryFilter = ({ filterPart }: FilterProps) => {
	return <DropdownTextSearch data={[]} searchText={filterPart.searchText} title={filterPart.filterDef.title} />;
};
