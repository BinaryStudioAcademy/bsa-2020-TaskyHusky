import React from 'react';
import { Table, Icon, Popup, Label } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { getFullUserName } from './helpers';

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
				<a href={`/issue/${issueKey}`} className={styles.underlinedLink}>
					{issueKey}
				</a>
			</Table.Cell>
			<Table.Cell>
				<div className={styles.userCell}>
					<a href={`/issue/${issueKey}`} className={styles.underlinedLink}>
						{summary}
					</a>
				</div>
			</Table.Cell>
			<Table.Cell>
				{assigned ? (
					<a href={`/profile/${assigned.id}`} className={styles.underlinedLink}>
						{getFullUserName(assigned.firstName, assigned.lastName)}
					</a>
				) : (
					'Unassigned'
				)}
			</Table.Cell>
			<Table.Cell>
				<a href={`/profile/${creator.id}`} className={styles.underlinedLink}>
					{getFullUserName(creator.firstName, creator.lastName)}
				</a>
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
