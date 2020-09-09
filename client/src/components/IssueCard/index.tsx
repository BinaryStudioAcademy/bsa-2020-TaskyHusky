import React, { useState } from 'react';
import { Segment, Header, Icon, Label } from 'semantic-ui-react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './styles.module.scss';
import { Redirect } from 'react-router-dom';
import { defaultAvatarBg } from 'constants/defaultColors';
import { Link } from 'react-router-dom';

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
	const { assigned } = issue;
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
			style={{ backgroundColor: selected ? '#eee' : 'white' }}
			className={styles.card_margin}
		>
			{redirecting ? <Redirect to={`/issue/${issue.issueKey}`} /> : ''}
			<Header className={styles.issueHeader}>
				<div>
					<p className="secondaryData" style={{ marginBottom: 0 }}>
						{issue.issueKey}
					</p>
					<Link to={`issue/${issue.issueKey}`}>
						<p className="standartLabel" style={{ wordBreak: 'break-word' }}>
							{issue.summary}
						</p>
					</Link>
				</div>
				{assigned && (
					<Link to={`/profile/${assigned.id}`}>
						<div className={styles.avatar} style={{ backgroundColor: assigned.color ?? defaultAvatarBg }}>
							{assigned.avatar ? (
								<img src={assigned.avatar} className={styles.img} alt="avatar" />
							) : (
								<p className={styles.avatarTitle}>{assigned.firstName[0] + assigned.lastName[0]}</p>
							)}
						</div>
					</Link>
				)}
			</Header>
			<div style={{ display: 'flex', alignItems: 'center' }} className={styles.meta}>
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
				{issue.storyPoint ? (
					<Label content={issue.storyPoint} className={styles.storyPoint} style={{ marginLeft: 'auto' }} />
				) : (
					''
				)}
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
