import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Dropdown, Icon, Popup, Label } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { getFullUserName } from './helpers';
import DeleteIssueModal from 'containers/DeleteIssueModal';

interface Props {
	issue: WebApi.Result.IssueResult;
}
interface PriorityIconProps {
	priority: WebApi.Entities.Priority;
}
interface IssueTypeIconProps {
	type: WebApi.Entities.IssueType;
}

const IssueTypeIcon = ({ type }: IssueTypeIconProps) => {
	const { icon, color, title, id } = type;

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

const PriorityIcon = ({ priority }: PriorityIconProps) => {
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

	const { id, creator, type, issueKey, summary, assigned, priority } = issue;

	return (
		<Table.Row key={id}>
			<Table.Cell>
				<IssueTypeIcon type={type} />
			</Table.Cell>
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
			<Table.Cell>
				<PriorityIcon priority={priority} />
			</Table.Cell>
			<Table.Cell>{renderStatus({ color: 'blue', title: 'In progress' })}</Table.Cell>
			<Table.Cell>Unresolved</Table.Cell>
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
									currentIssueId={issue.id as string}
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
