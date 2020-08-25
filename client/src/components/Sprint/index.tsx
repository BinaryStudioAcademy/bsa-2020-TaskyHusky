import React from 'react';
import { SprintHeader } from './SprintHeader/index';
import { SprintIssues } from './SprintIssues/index';
import { useTranslation } from 'react-i18next';

type Props = WebApi.Entities.Sprint;

export const Sprint: React.FC<Props> = (props: Props) => {
	const { t } = useTranslation();
	const { id, isActive, sprintName, issues, isCompleted } = props;

	if (!issues) {
		return null;
	}

	return (
		<>
			<SprintHeader id={id} isActive={isActive} name={sprintName} issues={issues} isCompleted={isCompleted} />
			<SprintIssues issues={issues} noIssuesText={t('no_issues_in_sprint')} />
		</>
	);
};

export default Sprint;
