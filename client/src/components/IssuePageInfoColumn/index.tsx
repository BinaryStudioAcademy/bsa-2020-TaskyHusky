import React, { useState } from 'react';
import { Label, Icon, Button, Dropdown, Popup, Image } from 'semantic-ui-react';
import { getUsername } from 'helpers/getUsername.helper';
import { ContextProvider } from 'containers/CreateIssueModal/logic/context';
import UpdateIssueModal from 'containers/UpdateIssueModal';
import { useTranslation } from 'react-i18next';
import { useIO } from 'hooks/useIO';
import { NotificationManager } from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { watchIssue } from 'pages/IssuePage/logic/actions';
import { RootState } from 'typings/rootState';
import { isImage } from 'helpers/isImage.helper';
import { SemanticCOLORS, SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import DeleteIssueModal from 'containers/DeleteIssueModal';
import { Redirect } from 'react-router-dom';

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
	const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);
	const issueWatchers = issue.watchers ?? [];
	const { t } = useTranslation();

	useIO(WebApi.IO.Types.Issue, (io) => {
		io.on(WebApi.IO.IssueActions.UpdateIssue, (id: string, data: WebApi.Result.IssueResult) => {
			if (id === issue.id) {
				setIssue(data);
			}
		});

		io.on(WebApi.IO.IssueActions.DeleteIssue, (id: string) => {
			if (id === issue.id && !toPageLink) {
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
		return <Redirect to="/login" />;
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
					paddingBottom: 10,
				}}
			>
				<div style={{ marginTop: 10 }}>
					<Dropdown
						button
						className="contentBtn icon"
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
					<Button className="primaryBtn" onClick={() => openEditModal()}>
						{t('edit_issue')}
					</Button>
					<DeleteIssueModal
						currentIssueId={issue.id}
						onOpen={() => setIsDeleteModalOpened(true)}
						onClose={() => setIsDeleteModalOpened(false)}
						open={isDeleteModalOpened}
					>
						<Button
							className="contentBtn"
							onClick={() => setIsDeleteModalOpened(true)}
							icon="trash alternate"
							title={t('delete')}
						/>
					</DeleteIssueModal>
				</div>
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
				<h4>{t('Status')}</h4>
				<Label color={issue.status?.color as SemanticCOLORS}>{issue.status?.title}</Label>
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
					? issue.links.map((link, i) => (
							<a
								rel="noopener noreferrer"
								target="_blank"
								href={link}
								key={i}
								style={{ marginRight: 10 }}
							>
								{link}
							</a>
					  ))
					: t('no')}
				<h4>{t('attachments')}</h4>
				{issue.attachments && issue.attachments.length
					? issue.attachments.map((link, i) => {
							const fname = link.slice(link.lastIndexOf('/') + 1);

							return (
								<Popup
									key={i}
									openOnTriggerMouseEnter
									closeOnPortalMouseLeave
									trigger={<span style={{ marginRight: 10 }}>{fname}</span>}
								>
									{isImage(fname) ? <Image src={link} alt="Image" /> : ''}
									<a href={link} download>
										{t('click_to_download')}
									</a>
								</Popup>
							);
					  })
					: t('no')}
				<h4>{t('labels')}</h4>
				{issue.labels && issue.labels.length
					? issue.labels.map((label, index) => <Label key={index}>{label}</Label>)
					: t('no')}
				<h4>{t('type')}</h4>
				<Label color={issue.type.color as SemanticCOLORS}>
					<Icon name={issue.type.icon as SemanticICONS} />
					{issue.type.title}
				</Label>
				<h4>{t('priority')}</h4>
				<Label color={issue.priority.color as SemanticCOLORS}>
					<Icon name={issue.priority.icon as SemanticICONS} />
					{issue.priority.title}
				</Label>
				<h4>{t('story_point')}</h4>
				{issue.storyPoint ? (
					<Label style={{ borderRadius: '30%' }}>{issue.storyPoint}</Label>
				) : (
					<span>{t('no')}</span>
				)}
			</div>
			<ContextProvider customInitalState={initialIssue}>
				<UpdateIssueModal current={initialIssue} getOpenFunc={(open) => (openEditModal = open)} />
			</ContextProvider>
		</>
	);
};

export default IssuePageInfoColumn;
