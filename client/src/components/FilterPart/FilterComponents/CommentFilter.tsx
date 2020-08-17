import React from 'react';
import { DropdownTextSearch } from '../DropdownComponents/index';
import { FilterProps } from './types';

const CommentFilter = ({ filterPart }: FilterProps) => {
	return <DropdownTextSearch filterPart={filterPart} />;
};

export default CommentFilter;
