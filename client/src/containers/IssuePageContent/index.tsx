import React, { useState, useEffect } from 'react';
import { Comment, Icon, Menu } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import IssueCommentForm from 'components/IssueCommentForm';
import { getComments, getCommits } from 'services/issue.service';
import IssueComment from 'components/IssueComment';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import styles from './styles.module.scss';
import IssuePageInfoColumn from 'components/IssuePageInfoColumn';
import { useIO } from 'hooks/useIO';
import IssueCommit from '../../components/IssueCommit/issueCommit';
import { convertIssueResultToPartialIssue } from 'helpers/issueResultToPartialIssue';
import Spinner from 'components/common/Spinner';
import { Redirect } from 'react-router-dom';
import SmallEditForm from './SmallEditForm';
import { SemanticICONS, SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';

interface Props {
	issue: WebApi.Result.IssueResult;
}

enum MenuStates {
	commentsShown = 'commentsShown',
	commitsShown = 'commitsShown',
	none = 'none',
}

const IssuePageContent: React.FC<Props> = ({ issue: givenIssue }) => {
	const [menuState, setMenuState] = useState<MenuStates>(MenuStates.commentsShown);
	const [issue, setIssue] = useState<WebApi.Result.IssueResult>(givenIssue);
	const [comments, setComments] = useState<WebApi.Result.IssueCommentResult[]>([]);
	const [commits, setCommits] = useState<WebApi.Result.CommitResult[]>([]);
	const [mustFetchComments, setMustFetchComments] = useState<boolean>(true);
	const { t } = useTranslation();
	const authData = useSelector((state: RootState) => state.auth);

	useIO(WebApi.IO.Types.Issue, (io) => {
		io.on(WebApi.IO.IssueActions.UpdateIssue, (id: string, newIssue: WebApi.Result.IssueResult) => {
			if (issue.id === id) {
				setIssue(newIssue);
			}
		});

		io.on(WebApi.IO.IssueActions.CommentIssue, (id: string, newComment: WebApi.Result.IssueCommentResult) => {
			if (id === issue.id) {
				setComments([...comments, newComment]);
			}
		});

		io.on(
			WebApi.IO.IssueActions.UpdateIssueComment,
			(id: string, commentId: string, newComment: WebApi.Result.IssueCommentResult) => {
				if (id === issue.id) {
					const index = comments.findIndex((comment) => comment.id === commentId);
					const newComments = [...comments];
					newComments[index] = newComment;
					setComments(newComments);
				}
			},
		);

		io.on(WebApi.IO.IssueActions.DeleteIssueComment, (id: string, commentId: string) => {
			if (id === issue.id) {
				const index = comments.findIndex((comment) => comment.id === commentId);
				const newComments = [...comments];
				newComments.splice(index, 1);
				setComments(newComments);
			}
		});
	});

	const { watchers, ...issueForDefault } = issue;

	const initialIssue = convertIssueResultToPartialIssue(issueForDefault);

	useEffect(() => {
		if (mustFetchComments) {
			getComments(issue.id).then(setComments);
			getCommits(issue.summary || '').then(setCommits);
			setMustFetchComments(false);
		}
	}, [mustFetchComments, issue.id, issue.summary]);

	if (!authData.user) {
		return <Redirect to="/login" />;
	}

	if (mustFetchComments) {
		return <Spinner />;
	}

	return (
		<div className={`fill ${styles.container}`} style={{ display: 'flex', justifyContent: 'center' }}>
			<div className={styles.innerContainer}>
				<h4>
					<Icon
						name={issue.type.icon as SemanticICONS}
						title={`${t('type')}: ${issue.type.title}`}
						color={issue.type.color as SemanticCOLORS}
					/>
					<span style={{ fontWeight: 400 }}>{issue.issueKey}</span>
				</h4>
				<h1>{issue.summary}</h1>
				<h4>{t('description')}</h4>
				<p>{issue.description || t('no')}</p>
				<SmallEditForm links={issue.links ?? []} attachments={issue.attachments ?? []} id={issue.id} />
				<div className="site-header">
					<Menu className={styles.menu}>
						<Menu.Item
							onClick={() => setMenuState(MenuStates.commentsShown)}
							className={styles.item}
							active={menuState === MenuStates.commentsShown}
						>
							{t('comments')}
						</Menu.Item>
						<Menu.Item
							onClick={() => setMenuState(MenuStates.commitsShown)}
							className={styles.item}
							active={menuState === MenuStates.commitsShown}
						>
							{t('commits')}
						</Menu.Item>
					</Menu>
				</div>
				{menuState === MenuStates.commitsShown && (
					<Comment.Group
						style={{
							maxHeight: '40%',
							overflowY: 'auto',
							width: '100%',
							maxWidth: '100%',
							marginBottom: 20,
						}}
					>
						{commits.length
							? commits.map((commit) => <IssueCommit commit={commit} key={commit.hash} />)
							: t('no')}
					</Comment.Group>
				)}
				{menuState === MenuStates.commentsShown && (
					<Comment.Group
						style={{
							maxHeight: '40%',
							overflowY: 'auto',
							width: '100%',
							maxWidth: '100%',
							marginBottom: 20,
						}}
					>
						{comments.map((comment) => (
							<IssueComment comment={comment} key={comment.id} />
						))}
					</Comment.Group>
				)}
				{menuState === MenuStates.commentsShown && <IssueCommentForm issueId={issue.id} />}
			</div>
			<IssuePageInfoColumn issue={issue} initialIssue={initialIssue} />
		</div>
	);
};

export default IssuePageContent;
