import React from 'react';
import { DropdownCheckboxSearch } from '../DropdownComponents/index';
import { FilterProps, DefinitionEntity } from './types';
import { definitionTypesToDropdownData } from './helpers';
import { RootState } from 'typings/rootState';
import { useSelector } from 'react-redux';

const IssueStatusFilter = ({ filterPart }: FilterProps) => {
	const { statuses } = useSelector((rootState: RootState) => rootState.issues);

	const data = (statuses as DefinitionEntity[]).map(definitionTypesToDropdownData);

	return <DropdownCheckboxSearch data={data} filterPart={filterPart} />;
};

export default IssueStatusFilter;
