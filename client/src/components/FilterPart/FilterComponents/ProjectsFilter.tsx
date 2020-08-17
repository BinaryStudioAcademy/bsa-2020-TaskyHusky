import React, { useEffect } from 'react';
import { RootState } from 'typings/rootState';
import { DropdownCheckboxSearch } from '../DropdownComponents/index';
import { useSelector, useDispatch } from 'react-redux';
import { startLoading } from 'containers/Projects/logic/actions';
import { FilterProps } from './types';
import { DropdownOption } from '../types';

const ProjectsFilter = ({ filterPart }: FilterProps) => {
	const { projects } = useSelector((rootState: RootState) => rootState.projects);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(startLoading());
	}, [dispatch]);

	const projectsToDropdownData = (project: { name: string; id: string }): DropdownOption => {
		const { id, name } = project;
		const data = {
			value: id,
			key: id,
			text: name,
		};

		return data;
	};

	const data = projects.map(projectsToDropdownData);

	return <DropdownCheckboxSearch data={data} filterPart={filterPart} />;
};

export default ProjectsFilter;
