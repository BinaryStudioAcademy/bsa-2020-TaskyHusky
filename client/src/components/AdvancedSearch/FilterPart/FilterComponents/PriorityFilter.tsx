import React from 'react';
import { RootState } from 'typings/rootState';
import { DropdownCheckboxSearch } from '../DropdownComponents/index';
import { useSelector } from 'react-redux';
import { FilterProps, DefinitionEntity } from './types';
import { definitionTypesToDropdownData } from './helpers';

const PriorityFilter = ({ filterPart }: FilterProps) => {
	const { priorities } = useSelector((rootState: RootState) => rootState.issues);

	const data = (priorities as DefinitionEntity[]).map(definitionTypesToDropdownData);

	return <DropdownCheckboxSearch data={data} filterPart={filterPart} />;
};

export default PriorityFilter;
