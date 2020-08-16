import React from 'react';
import { SprintHeader } from './SprintHeader/index';
import { SprintIssue } from './SprintIssues/index';

type Props = WebApi.Entities.Sprint;

export const Sprint: React.FC<Props> = ({ id, isActive, sprintName }: Props) => {
	return (
		<>
			<SprintHeader id={id} isActive={isActive as boolean} name={sprintName as string} />
			<SprintIssue />
		</>
	);
};

export default Sprint;
