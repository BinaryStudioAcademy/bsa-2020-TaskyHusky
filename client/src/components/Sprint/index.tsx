import React from 'react';
import { SprintHeader } from './SprintHeader/index';
import { SprintIssue } from './SprintIssues/index';

type Props = WebApi.Entities.Sprint;

export const Sprint: React.FC<Props> = (props: Props) => {
	return (
		<>
			<SprintHeader />
			<SprintIssue />
		</>
	);
};

export default Sprint;
