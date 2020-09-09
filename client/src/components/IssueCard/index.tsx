import React, { useState } from 'react';
import { Segment, Header, Icon, Label } from 'semantic-ui-react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './styles.module.scss';
import { Redirect } from 'react-router-dom';
import { getUsername } from 'helpers/getUsername.helper';
import UserAvatar from 'components/common/UserAvatar';

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
	defaultSelected?: boolean;
	onSelectChange?: (event: OnSelectEvent) => void;
	getUnselect?: (event: GetUnselectEvent) => void;
}

const IssueCard: React.FC<Props> = ({
	issue,
	index,
	noDrag,
	noRedirect,
	selectable,
	onSelectChange,
	getUnselect,
	defaultSelected,
}) => {
	const [selected, setSelected] = useState<boolean>(defaultSelected ?? false);
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
			style={{ backgroundColor: selected ? '#eee' : 'white' }}
			className={styles.card_margin}
		>
			{redirecting ? <Redirect to={`/issue/${issue.issueKey}`} /> : ''}
			<div>
				{issue.labels
					? issue.labels.map((label) => (
							<Label
								key={label.id}
								style={{
									color: label.textColor,
									backgroundColor: label.backgroundColor,
									paddingTop: 3,
									paddingBottom: 3,
								}}
							>
								{label.text}
							</Label>
					  ))
					: ''}
			</div>
			<Header style={{ marginBottom: 0, marginTop: 10 }}>
				{issue.summary}
				{issue.storyPoint ? <Label content={issue.storyPoint} /> : ''}
			</Header>
			<div
				style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
				className={styles.meta}
			>
				{issue.status ? (
					<Label
						style={{
							paddingTop: 3,
							paddingBottom: 3,
							marginTop: 10,
							marginBottom: 3,
							backgroundColor: issue.status.color,
							color: 'white',
						}}
						content={issue.status.title}
					/>
				) : (
					''
				)}
				{issue.issueKey}
			</div>

			<div className={styles.inlineContainer}>
				<div>
					<Icon name={issue.type.icon as any} color={issue.type.color as any} title={issue.type.title} />
					<Icon
						name={issue.priority.icon as any}
						color={issue.priority.color as any}
						title={issue.priority.title}
					/>
				</div>
				{issue.assigned ? (
					<div className={styles.meta}>
						<UserAvatar user={issue.assigned} small />
						{getUsername(issue.assigned)}
					</div>
				) : (
					''
				)}
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
