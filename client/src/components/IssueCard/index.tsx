import React, { useState, useEffect } from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
import { Draggable } from 'react-beautiful-dnd';
import { getById } from 'services/issue.service';
import styles from './styles.module.scss';

interface Props {
	issueId: string;
	index: number;
}

const IssueCard: React.FC<Props> = ({ issueId, index }) => {
	const [issue, setIssue] = useState<WebApi.Result.IssueResult | null>(null);

	useEffect(() => {
		if (!issue) {
			getById(issueId).then(setIssue);
		}
	}, [issue, issueId]);

	if (!issue) {
		return null;
	}

	return (
		<Draggable draggableId={`issue-card__${issueId}`} index={index}>
			{(provided, snapshot) => (
				<div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
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
				</div>
			)}
		</Draggable>
	);
};

export default IssueCard;
