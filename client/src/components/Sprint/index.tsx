import React from 'react';
import { useTranslation } from 'react-i18next';
import { SprintHeader } from './SprintHeader';
import { SprintIssues } from './SprintIssues';

interface Props {
	sprint: WebApi.Entities.Sprint;
	issues: WebApi.Entities.Issue[];
}

interface DragProps {
	listId: string;
	listType?: string;
	internalScroll?: boolean;
	isCombineEnabled?: boolean;
}

export const Sprint: React.FC<Props & DragProps> = (props: Props & DragProps) => {
	const { t } = useTranslation();

	if (!props.issues || props.sprint?.isCompleted) {
		return null;
	}

	return (
		<>
			<SprintHeader
				id={props.sprint?.id ?? 'backlog'}
				isActive={props.sprint?.isActive}
				name={props.sprint?.sprintName ?? t('backlog')}
				issues={props.issues}
				isCompleted={props.sprint?.isCompleted}
				startDate={props.sprint?.startDate}
				endDate={props.sprint?.endDate}
			/>
			<SprintIssues
				issues={props.issues}
				sprintName={props.sprint?.sprintName ?? t('backlog')}
				listId={props.listId}
				listType={props.listType}
			/>
		</>
	);
};

export default Sprint;
