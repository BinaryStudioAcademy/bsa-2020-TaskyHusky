import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Dropdown, Icon, Popup, Label } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { getFullUserName } from './helpers';
import DeleteIssueModal from 'containers/DeleteIssueModal';

interface Props {
	issue: WebApi.Entities.Issue;
}

const renderIssueType = (issueType: WebApi.Entities.IssueType) => {
	const { icon, color, title, id } = issueType;

	return (
		<Popup
			content={`Type: ${title}`}
			trigger={
				<Icon
					size="small"
					bordered
					color={color as 'red'}
					key={`issueTypeIc-${id}`}
					name={`${icon}` as 'folder'}
				/>
			}
		/>
	);
};

const renderPriority = (priority: WebApi.Entities.Priority) => {
	const { icon, color, title, id } = priority;

	return (
		<Popup
			content={`Priority: ${title}`}
			trigger={<Icon key={`priorityIc-${id}`} color={color as 'red'} name={icon as 'arrow up'} />}
		/>
	);
};

const renderStatus = (status: { title: string; color: string }) => {
	const { color, title } = status;
	return (
		<Label horizontal color={color as 'red'}>
			{title}
		</Label>
	);
};

const IssueItem = ({ issue }: Props) => {
	const [open, setOpen] = React.useState(false);
	const { t } = useTranslation();
	const mockedIssue = {
		summary: 'Very summary',
		issueKey: 'TH-1',
		assigned: {
			id: 'id-2',
			firstName: 'Ivan',
			lastName: 'Ivanov',
		},
		creator: {
			id: 'id-2',
			firstName: 'Danylo',
			lastName: 'Karpenko',
		},
		type: {
			id: 'type-id-12',
			icon: 'check',
			color: 'teal',
			title: 'Task',
		},
		status: {
			title: 'In Progress',
			color: 'blue',
		},
		priority: { title: 'Hight', color: 'orange', icon: 'arrow up', id: '1' },
		id: 'a269d9f4-1c10-40ad-81e0-7ac333804d91',
	};
	const { id, creator, type, issueKey, summary, assigned, priority, status } = mockedIssue; /*issue*/

	return (
		<Table.Row key={id}>
			<Table.Cell>{renderIssueType(type as WebApi.Entities.IssueType)}</Table.Cell>
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
			<Table.Cell>
				<a href={`/profile/${assigned.id}`} className={styles.underlinedLink}>
					{getFullUserName(assigned.firstName, assigned.lastName)}
				</a>
			</Table.Cell>
			<Table.Cell>
				<a href={`/profile/${creator.id}`} className={styles.underlinedLink}>
					{getFullUserName(creator.firstName, creator.lastName)}
				</a>
			</Table.Cell>
			<Table.Cell>{renderPriority(priority)}</Table.Cell>
			<Table.Cell>{renderStatus(status)}</Table.Cell>
			<Table.Cell>Unresolved{/* resolution.title */}</Table.Cell>
			<Table.Cell>03/серп./20</Table.Cell>
			<Table.Cell>10/серп./20</Table.Cell>
			<Table.Cell className={styles.editCell}>
				<Dropdown className={styles.dropdown} compact fluid icon={<Icon name="ellipsis horizontal" />}>
					<Dropdown.Menu direction="left">
						<Dropdown.Item
							content={
								<a className={styles.issueAction} href={`/issue/${id}`}>
									{t('Edit')}
								</a>
							}
						/>
						<Dropdown.Item
							content={
								<DeleteIssueModal
									onClose={() => setOpen(false)}
									open={open}
									onOpen={() => setOpen(true)}
									onDelete={() => window.location.reload()}
									currentIssueId={issue.id}
								/>
							}
						/>
					</Dropdown.Menu>
				</Dropdown>
			</Table.Cell>
		</Table.Row>
	);
};

export default IssueItem;
