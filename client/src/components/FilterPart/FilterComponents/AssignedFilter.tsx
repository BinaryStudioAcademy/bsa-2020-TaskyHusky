import React, { useEffect } from 'react';
import { RootState } from 'typings/rootState';
import { DropdownCheckboxSearch } from '../DropdownComponents/index';
import { useSelector, useDispatch } from 'react-redux';
import { requestAllUsers } from 'commonLogic/users/actions';
import { FilterProps } from './types';
import { DropdownOption } from '../types';

const AssignedFilter = ({ filterPart }: FilterProps) => {
	const { users } = useSelector((rootState: RootState) => rootState.users);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(requestAllUsers());
	}, [dispatch]);

	const usersToDropdownData = (user: WebApi.Entities.UserProfile): DropdownOption => {
		const { id, firstName, lastName } = user;
		const fullName = `${firstName} ${lastName}`;
		const data = {
			value: id,
			key: id,
			text: fullName,
		};
		return data;
	};

	const data = users.map(usersToDropdownData);

	return <DropdownCheckboxSearch data={data} filterPart={filterPart} />;
};

export default AssignedFilter;
