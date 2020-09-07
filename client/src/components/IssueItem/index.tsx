import React from 'react';
import { Table, Icon, Popup, Label } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { getFullUserName } from './helpers';
import { Link } from 'react-router-dom';

interface Props {
	issue: WebApi.Result.IssueResult;
}
interface PriorityIconProps {
	priority: WebApi.Entities.Priority | undefined;
}
interface IssueTypeIconProps {
	type: WebApi.Entities.IssueType | undefined;
}

const IssueTypeIcon = ({ type }: IssueTypeIconProps) => {
	return (
		<>
			{type && (
				<Popup
					content={`Type: ${type.title}`}
					trigger={
						<Icon
							size="small"
							bordered
							color={type.color as 'red'}
							key={`issueTypeIc-${type.id}`}
							name={`${type.icon}` as 'folder'}
						/>
					}
				/>
			)}
		</>
	);
};

const PriorityIcon = ({ priority }: PriorityIconProps) => {
	return (
		<>
			{priority && (
				<Popup
					content={`Priority: ${priority.title}`}
					trigger={
						<Icon
							key={`priorityIc-${priority.id}`}
							color={priority.color as 'red'}
							name={priority.icon as 'arrow up'}
						/>
					}
				/>
			)}
		</>
	);
};

const renderStatus = (status: WebApi.Entities.IssueStatus | undefined) => {
	return (
		<>
			{status && (
				<Label horizontal color={status.color as 'red'}>
					{status.title}
				</Label>
			)}
		</>
	);
};

const IssueItem = ({ issue }: Props) => {
	const { id, creator, type, issueKey, summary, assigned, priority, createdAt, updatedAt, status } = issue;

	return (
		<Table.Row key={id}>
			<Table.Cell>
				<IssueTypeIcon type={type} />
			</Table.Cell>
			<Table.Cell>
				<Link to={`/issue/${issueKey}`} className={styles.underlinedLink}>
					{issueKey}
				</Link>
			</Table.Cell>
			<Table.Cell>
				<div className={styles.userCell}>
					<Link to={`/issue/${issueKey}`} className={styles.underlinedLink}>
						{summary}
					</Link>
				</div>
			</Table.Cell>
			<Table.Cell>
				{assigned ? (
					<Link to={`/profile/${assigned.id}`} className={styles.underlinedLink}>
						{getFullUserName(assigned.firstName, assigned.lastName)}
					</Link>
				) : (
					'Unassigned'
				)}
			</Table.Cell>
			<Table.Cell>
				<Link to={`/profile/${creator.id}`} className={styles.underlinedLink}>
					{getFullUserName(creator.firstName, creator.lastName)}
				</Link>
			</Table.Cell>
			<Table.Cell>
				<PriorityIcon priority={priority} />
			</Table.Cell>
			<Table.Cell>{renderStatus(status)}</Table.Cell>
			<Table.Cell>{createdAt}</Table.Cell>
			<Table.Cell>{updatedAt}</Table.Cell>
		</Table.Row>
	);
};

export default IssueItem;
