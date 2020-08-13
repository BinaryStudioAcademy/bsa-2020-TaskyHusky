import React from 'react';
import { DropdownTextSearch } from '../DropdownComponents/index';
import { FilterProps } from './types';

const DescriptionFilter = ({ filterPart }: FilterProps) => {
	return <DropdownTextSearch data={[]} searchText={filterPart.searchText} title={filterPart.filterDef.title} />;
};

export default DescriptionFilter;
