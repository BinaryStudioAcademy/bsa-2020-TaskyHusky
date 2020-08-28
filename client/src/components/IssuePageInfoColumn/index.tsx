import React, { useState } from 'react';
import { Label, Icon, Button, Dropdown } from 'semantic-ui-react';
import { getUsername } from 'helpers/getUsername.helper';
import { ContextProvider } from 'containers/CreateIssueModal/logic/context';
import UpdateIssueModal from 'containers/UpdateIssueModal';
import { useTranslation } from 'react-i18next';
import { useIO } from 'hooks/useIO';
import { NotificationManager } from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { watchIssue } from 'pages/IssuePage/logic/actions';
import { RootState } from 'typings/rootState';

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
	const issueWatchers = issue.watchers ?? [];
	const { t } = useTranslation();

	useIO(WebApi.IO.Types.Issue, (io) => {
		io.on(WebApi.IO.IssueActions.UpdateIssue, (id: string, data: WebApi.Result.IssueResult) => {
			if (id === issue.id) {
				setIssue(data);
			}
		});

		io.on(WebApi.IO.IssueActions.DeleteIssue, (id: string) => {
			if (id === issue.id) {
				NotificationManager.warning(
					`${t('issue')} ${issue.issueKey} ${t('issue_was_deleted_message_part_2')}`,
					t('warning'),
					6000,
				);
			}
		});
	});

	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.auth.user);

	if (!user) {
		return null;
	}

	const watching = (issueWatchers ?? []).some((watcher) => watcher.id === user.id);
	const watchButtonText = watching ? t('unwatch') : t('watch');

	const watch = () => {
		dispatch(watchIssue({ id: issue.id }));
	};

	return (
		<>
			<div
				style={{
					...(leftAligned ? {} : { position: 'absolute', right: 10, top: -5 }),
					width: 400,
				}}
			>
				<Button.Group style={{ marginTop: 10 }} fluid>
					<Dropdown
						button
						className="icon"
						labeled
						title={watching ? t('watching') : t('not_watching')}
						floating
						icon={<Icon name={watching ? 'eye' : 'eye slash'} color={watching ? 'green' : 'grey'} />}
						text={String(issueWatchers.length)}
					>
						<Dropdown.Menu>
							<Dropdown.Header>{t('watchers')}</Dropdown.Header>
							<Dropdown.Item onClick={watch}>{watchButtonText}</Dropdown.Item>
							{issueWatchers.length ? (
								<>
									<Dropdown.Divider />
									{issueWatchers.map((watcher, i) => (
										<Dropdown.Item
											key={i}
											as="a"
											rel="noopener noreferrer"
											target="_blank"
											href={`/profile/${watcher.id}`}
										>
											{getUsername(watcher)}
										</Dropdown.Item>
									))}
								</>
							) : (
								''
							)}
						</Dropdown.Menu>
					</Dropdown>
					<Button secondary onClick={() => openEditModal()}>
						{t('edit_issue')}
					</Button>
				</Button.Group>
				{toPageLink ? (
					<h4>
						<a rel="noopener noreferrer" target="_blank" href={`/issue/${issue.issueKey}`}>
							Go to issue page #{issue.issueKey}
						</a>
					</h4>
				) : (
					''
				)}
				{withDescrtiption ? (
					<>
						<h4>{t('description')}</h4>
						{issue.description || t('no')}
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
				{issue.sprint ? issue.sprint.sprintName : t('no')}
				<h4>{t('links')}</h4>
				{issue.links && issue.links.length
					? issue.links.map((l, i) => (
							<a rel="noopener noreferrer" target="_blank" href={l} key={i} style={{ marginRight: 10 }}>
								{l}
							</a>
					  ))
					: t('no')}
				<h4>{t('attachments')}</h4>
				{issue.attachments && issue.attachments.length
					? issue.attachments.map((a, i) => (
							<a rel="noopener noreferrer" target="_blank" href={a} key={i} style={{ marginRight: 10 }}>
								{a}
							</a>
					  ))
					: t('no')}
				<h4>{t('labels')}</h4>
				{issue.labels && issue.labels.length
					? issue.labels.map((label, index) => <Label key={index}>{label}</Label>)
					: t('no')}
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
				<h4>{t('storyPoint')}</h4>
				{<Label style={{ borderRadius: '40%' }}>{issue.storyPoint || 0}</Label>}
			</div>
			<ContextProvider customInitalState={initialIssue}>
				<UpdateIssueModal current={initialIssue} getOpenFunc={(open) => (openEditModal = open)} />
			</ContextProvider>
		</>
	);
};

export default IssuePageInfoColumn;
