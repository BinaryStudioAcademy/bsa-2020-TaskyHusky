import React, { useState } from 'react';
import { Label, Icon, Button } from 'semantic-ui-react';
import { getUsername } from 'helpers/getUsername.helper';
import { ContextProvider } from 'containers/CreateIssueModal/logic/context';
import UpdateIssueModal from 'containers/UpdateIssueModal';
import { useTranslation } from 'react-i18next';
import { useIO } from 'hooks/useIO';
import { NotificationManager } from 'react-notifications';

interface Props {
	issue: WebApi.Result.IssueResult;
	initialIssue: WebApi.Issue.PartialIssue;
	leftAligned?: boolean;
	withDescrtiption?: boolean;
	toPageLink?: boolean;
}

const IssuePageInfoColumn: React.FC<Props> = ({
	issue: givenIssue,
	initialIssue,
	leftAligned,
	withDescrtiption,
	toPageLink,
}) => {
	const [issue, setIssue] = useState<WebApi.Result.IssueResult>(givenIssue);
	let openEditModal: () => void = () => {};
	const { t } = useTranslation();
	const io = useIO(WebApi.IO.Types.Issue);

	if (!io) {
		return null;
	}

	io.on(WebApi.IO.IssueActions.UpdateIssue, (id: string, data: WebApi.Result.IssueResult) => {
		if (id === issue.id) {
			setIssue(data);
		}
	});

	io.on(WebApi.IO.IssueActions.DeleteIssue, (id: string) => {
		if (id === issue.id) {
			NotificationManager.warning(
				`Issue ${issue.issueKey} was deleted. This page will not be available, once you reload or leave it.`,
				'Warning',
				6000,
			);
		}
	});

	return (
		<>
			<div
				style={{
					...(leftAligned ? {} : { position: 'absolute', right: 10, top: -5 }),
					width: 270,
				}}
			>
				<Button secondary onClick={() => openEditModal()} style={{ marginTop: 10 }} fluid>
					{t('edit_issue')}
				</Button>
				{toPageLink ? (
					<h4>
						<a rel="noopener noreferrer" target="_blank" href={`/issue/${issue.issueKey}`}>
							Go to issue page
						</a>
					</h4>
				) : (
					''
				)}
				{withDescrtiption ? (
					<>
						<h4>{t('description')}</h4>
						{issue.description}
					</>
				) : (
					''
				)}
				<h4>{t('assigned_by')}</h4>
				{issue.assigned ? (
					<a href={`/profile/${issue.assigned.id}`} target="_blank" rel="noopener noreferrer">
						{getUsername(issue.assigned)}
					</a>
				) : (
					t('no')
				)}
				<h4>{t('reported_by')}</h4>
				<a rel="noopener noreferrer" target="_blank" href={`/profile/${issue.creator.id}`}>
					{getUsername(issue.creator)}
				</a>
				<h4>{t('sprint')}</h4>
				Sprint will be here
				<h4>{t('links')}</h4>
				{(issue.links ?? []).map((l, i) => (
					<a rel="noopener noreferrer" target="_blank" href={l} key={i} style={{ marginRight: 10 }}>
						{l}
					</a>
				))}
				<h4>{t('attachments')}</h4>
				{(issue.attachments ?? []).map((a, i) => (
					<a rel="noopener noreferrer" target="_blank" href={a} key={i} style={{ marginRight: 10 }}>
						{a}
					</a>
				))}
				<h4>{t('labels')}</h4>
				{(issue.labels || []).map((label, index) => (
					<Label key={index}>{label}</Label>
				))}
				<h4>{t('type')}</h4>
				<Label color={issue.type.color as any}>
					<Icon name={issue.type.icon as any} />
					{issue.type.title}
				</Label>
				<h4>{t('priority')}</h4>
				<Label color={issue.priority.color as any}>
					<Icon name={issue.priority.icon as any} />
					{issue.priority.title}
				</Label>
			</div>
			<ContextProvider customInitalState={initialIssue}>
				<UpdateIssueModal current={issue} getOpenFunc={(open) => (openEditModal = open)} />
			</ContextProvider>
		</>
	);
};

export default IssuePageInfoColumn;
