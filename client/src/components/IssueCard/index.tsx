import React, { useState } from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './styles.module.scss';
import { Redirect } from 'react-router-dom';
import { getUsername } from 'helpers/getUsername.helper';

interface BaseEvent {
	id: string;
	key: string;
}

interface OnSelectEvent extends BaseEvent {
	selected: boolean;
}

interface GetUnselectEvent extends BaseEvent {
	unselect: () => void;
}

interface Props {
	issue: WebApi.Result.IssueResult;
	index: number;
	noDrag?: boolean;
	noRedirect?: boolean;
	selectable?: boolean;
	onSelectChange?: (event: OnSelectEvent) => void;
	getUnselect?: (event: GetUnselectEvent) => void;
}

const IssueCard: React.FC<Props> = ({ issue, index, noDrag, noRedirect, selectable, onSelectChange, getUnselect }) => {
	const [selected, setSelected] = useState<boolean>(false);
	const [redirecting, setRedirecting] = useState<boolean>(false);

	if (getUnselect) {
		getUnselect({
			unselect: () => setSelected(false),
			id: issue.id,
			key: issue.issueKey as string,
		});
	}

	const onClick = () => {
		setRedirecting(!noRedirect);

		if (selectable) {
			if (onSelectChange) {
				onSelectChange({
					id: issue.id,
					key: issue.issueKey as string,
					selected: !selected,
				});
			}

			setSelected(!selected);
		}
	};

	const content = (
		<Segment
			onClick={onClick}
			style={{ backgroundColor: selected ? '#EFF' : 'white' }}
			className={styles.card_margin}
		>
			{redirecting ? <Redirect to={`/issue/${issue.issueKey}`} /> : ''}
			<Header>{issue.summary}</Header>
			<div className={styles.inlineContainer}>
				<Icon
					className={styles.right}
					name={issue.type.icon as any}
					color={issue.type.color as any}
					title={issue.type.title}
				/>
				<Icon
					className={styles.right}
					name={issue.priority.icon as any}
					color={issue.priority.color as any}
					title={issue.priority.title}
				/>
				<div className={styles.left}>
					<span className={styles.meta}>{getUsername(issue.creator)}</span>
				</div>
			</div>
		</Segment>
	);

	if (noDrag) {
		return content;
	}

	return (
		<Draggable draggableId={`issue-card__${issue.issueKey}`} index={index}>
			{(provided, snapshot) => (
				<div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
					{content}
				</div>
			)}
		</Draggable>
	);
};

export default IssueCard;
