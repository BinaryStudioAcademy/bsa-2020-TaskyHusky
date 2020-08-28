import React from 'react';
import { List, Item } from 'semantic-ui-react';
import styles from './styles.module.scss';
import AssigneeAvatar from './AssigneeAvatar/index';
import { DroppableProvided, Draggable, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

interface Props {
	issues: WebApi.Entities.Issue[];
	sprintName: string;
}
interface DragProps {
	listId: string;
	listType?: string;
	internalScroll?: boolean;
	isCombineEnabled?: boolean;
}

export const SprintIssues: React.FC<Props & DragProps> = (props: Props & DragProps) => {
	const { t } = useTranslation();

	const renderIssues = (dropProvided: DroppableProvided) => {
		return (
			<div ref={dropProvided.innerRef}>
				<List selection={!!props.issues?.length} verticalAlign="middle" className={styles.issuesList}>
					{!!props.issues?.length ? (
						props.issues.map((issue, index) => (
							<Draggable key={issue.id} draggableId={issue.id} index={index}>
								{(dragProvided) => (
									<div
										{...dragProvided.dragHandleProps}
										{...dragProvided.draggableProps}
										ref={dragProvided.innerRef}
									>
										<List.Item
											href={`/issue/${issue.issueKey}`}
											key={issue.id}
											className={styles.issueItem}
										>
											<List.Content className={styles.leftContent}>
												<List.Icon
													name={issue.type?.icon as any}
													color={issue.type?.color as any}
													title={issue.type?.title}
												/>
												<List.Header>{issue.summary}</List.Header>
											</List.Content>
											<List.Content className={styles.rightContent}>
												<AssigneeAvatar user={issue.assigned} />
												<Item
													className={
														issue.status?.title === 'Done'
															? styles.issueKeyItemCompleted
															: styles.issueKeyItem
													}
												>
													{issue.issueKey}
												</Item>
												<List.Icon
													title={issue.priority?.title}
													name={issue.priority?.icon as any}
													color={issue.priority?.color as any}
													className={styles.priorityItem}
												/>
											</List.Content>
										</List.Item>
									</div>
								)}
							</Draggable>
						))
					) : (
						<List.Item className={styles.emptyIssueItem}>
							<span>
								{props.sprintName !== t('backlog')
									? t('no_issues_in_sprint')
									: t('no_issues_in_backlog')}
							</span>
						</List.Item>
					)}
					{dropProvided.placeholder}
				</List>
			</div>
		);
	};

	return (
		<Droppable droppableId={props.listId} type={props.listType} direction="vertical" isCombineEnabled={false}>
			{(dropProvided, dropSnapshot) => (
				<div className={dropSnapshot.isDraggingOver ? styles.backLight : ''} {...dropProvided.droppableProps}>
					{props.internalScroll ? <div>{renderIssues(dropProvided)}</div> : renderIssues(dropProvided)}
				</div>
			)}
		</Droppable>
	);
};

export default SprintIssues;
