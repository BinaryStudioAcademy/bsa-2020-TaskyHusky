import React from 'react';
import { DropdownTextSearch } from '../DropdownComponents/index';
import { FilterProps } from './types';

const DescriptionFilter = ({ filterPart }: FilterProps) => {
	return <DropdownTextSearch filterPart={filterPart} />;
};

export default DescriptionFilter;
