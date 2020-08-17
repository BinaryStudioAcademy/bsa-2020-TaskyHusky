import React from 'react';
import { DropdownTextSearch } from '../DropdownComponents/index';
import { FilterProps } from './types';

const SummaryFilter = ({ filterPart }: FilterProps) => {
	return <DropdownTextSearch filterPart={filterPart} />;
};

export default SummaryFilter;
