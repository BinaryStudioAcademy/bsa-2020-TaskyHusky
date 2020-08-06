import React from 'react';
import { Table, Dropdown, Icon } from 'semantic-ui-react';
import styles from './styles.module.scss';

interface Props {
	issue: WebApi.Entities.Issue;
}

const IssueItem = ({ issue }: Props) => {
	const { id, creatorID, type, issueKey, summary, assignedID, priority, boardColumnID } = issue;

	return (
		<Table.Row key={id}>
			<Table.Cell>{type?.title}</Table.Cell>
			<Table.Cell>
				<a href={`/issue/${id}`} className={styles.underlinedLink}>
					{issueKey}
				</a>
			</Table.Cell>
			<Table.Cell>
				<div className={styles.userCell}>
					<a href={`/issue/${id}`} className={styles.underlinedLink}>
						{summary}
					</a>
				</div>
			</Table.Cell>
			<Table.Cell>Assigned to {assignedID}</Table.Cell>
			<Table.Cell>Reported by {creatorID}</Table.Cell>
			<Table.Cell>P {priority}</Table.Cell>
			<Table.Cell>Status {boardColumnID}</Table.Cell>
			<Table.Cell>Resolution {boardColumnID}</Table.Cell>
			<Table.Cell>CreatedAt {boardColumnID}</Table.Cell>
			<Table.Cell>UpdatedAt {boardColumnID}</Table.Cell>
			<Table.Cell className={styles.editCell}>
				<Dropdown className={styles.dropdown} compact fluid icon={<Icon name="ellipsis horizontal" />}>
					<Dropdown.Menu>
						<Dropdown.Item text="Edit" />
						<Dropdown.Divider />
						<Dropdown.Item text="Share..." />
					</Dropdown.Menu>
				</Dropdown>
			</Table.Cell>
		</Table.Row>
	);
};

export default IssueItem;
