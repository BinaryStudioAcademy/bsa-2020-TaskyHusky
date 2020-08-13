import React from 'react';
import { Button, Header, Table, Label, Icon } from 'semantic-ui-react';
import CreateIssueModal from 'containers/CreateIssueModal';
import { useTranslation } from 'react-i18next';
import { ContextProvider } from 'containers/CreateIssueModal/logic/context';
import UpdateIssueModal from 'containers/UpdateIssueModal';
import { getUsername } from 'helpers/getUsername.helper';

interface Props {
	issue: WebApi.Result.IssueResult;
}

const IssuePageContent: React.FC<Props> = ({ issue }) => {
	const { t } = useTranslation();
	let openEditModal: () => void = () => {};

	const initalIssue = {
		...issue,
		type: issue.type.id,
		priority: issue.priority.id,
	};

	return (
		<>
			<Button.Group>
				<CreateIssueModal>
					<Button primary>{t('create_issue')}</Button>
				</CreateIssueModal>
				<Button secondary inverted onClick={() => openEditModal()}>
					{t('edit_issue')}
				</Button>
			</Button.Group>
			<Header as="h1">
				{issue.summary} #{issue.issueKey}
			</Header>
			{issue.description}
			<Table definition>
				<Table.Body>
					<Table.Row>
						<Table.Cell>{t('reported_by')}</Table.Cell>
						<Table.Cell>{getUsername(issue.creator)}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>{t('assigned_by')}</Table.Cell>
						<Table.Cell>{issue.assigned ? getUsername(issue.assigned) : t('no')}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>{t('sprint')}</Table.Cell>
						<Table.Cell>Sprint will be here</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>{t('links')}</Table.Cell>
						<Table.Cell>
							{(issue.links ?? []).map((l, i) => (
								<a href={l} key={i} style={{ marginRight: 10 }}>
									{l}
								</a>
							))}
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>{t('attachments')}</Table.Cell>
						<Table.Cell>
							{(issue.attachments ?? []).map((a, i) => (
								<a href={a} key={i} style={{ marginRight: 10 }}>
									{a}
								</a>
							))}
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>{t('labels')}</Table.Cell>
						<Table.Cell>
							{(issue.labels || []).map((label, index) => (
								<Label key={index}>{label}</Label>
							))}
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>{t('type')}</Table.Cell>
						<Table.Cell>
							<Label color={issue.type.color as any}>
								<Icon name={issue.type.icon as any} />
								{issue.type.title}
							</Label>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>{t('priority')}</Table.Cell>
						<Table.Cell>
							<Label color={issue.priority.color as any}>
								<Icon name={issue.priority.icon as any} />
								{issue.priority.title}
							</Label>
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
			<ContextProvider customInitalState={initalIssue}>
				<UpdateIssueModal
					onSubmit={() => window.location.reload()}
					current={issue}
					getOpenFunc={(open) => (openEditModal = open)}
				/>
			</ContextProvider>
		</>
	);
};

export default IssuePageContent;
