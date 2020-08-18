import React from 'react';
import { SprintHeader } from './SprintHeader/index';
import { SprintIssues } from './SprintIssues/index';

type Props = WebApi.Entities.Sprint;

export const Sprint: React.FC<Props> = (props: Props) => {
	const { id, isActive, sprintName, issues } = props;

	return (
		<>
			<SprintHeader id={id} isActive={isActive} name={sprintName} issues={issues} />
			<SprintIssues issues={issues} />
		</>
	);
};

export default Sprint;
