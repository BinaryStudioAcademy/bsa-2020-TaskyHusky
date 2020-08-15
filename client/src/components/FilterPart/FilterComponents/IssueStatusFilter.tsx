import React from 'react';
import { DropdownCheckboxSearch } from '../DropdownComponents/index';
import { FilterProps, DefinitionEntity } from './types';
import { definitionTypesToDropdownData } from './helpers';

const IssueStatusFilter = ({ filterPart }: FilterProps) => {
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

export default IssueStatusFilter;
