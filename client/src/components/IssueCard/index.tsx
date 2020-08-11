import React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './styles.module.scss';

interface Props {
	issue: WebApi.Result.IssueResult;
	index: number;
	noDrag?: boolean;
}

const IssueCard: React.FC<Props> = ({ issue, index, noDrag }) => {
	const content = (
		<Segment>
			<Header>{issue.summary}</Header>
			<div className={styles.inlineContainer}>
				<Icon
					className={styles.left}
					name={issue.type.icon as any}
					color={issue.type.color as any}
					title={issue.type.title}
				/>
				<Icon
					className={styles.left}
					name={issue.priority.icon as any}
					color={issue.priority.color as any}
					title={issue.priority.title}
				/>
				<div className={styles.right}>
					<span className={styles.meta}>{issue.issueKey}</span>
				</div>
			</div>
		</Segment>
	);

	if (noDrag) {
		return content;
	}

	return (
		<Draggable draggableId={`issue-card__${issue.id}`} index={index}>
			{(provided, snapshot) => (
				<div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
					{content}
				</div>
			)}
		</Draggable>
	);
};

export default IssueCard;
