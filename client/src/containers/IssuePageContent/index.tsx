import React, { useState, useEffect } from 'react';
import { Button, Comment } from 'semantic-ui-react';
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

interface Props {
	issue: WebApi.Result.IssueResult;
}

enum MenuStates {
	commentsShown = 'commentsShown',
	commitsShown = 'commitsShown',
	none = 'none',
}

const IssuePageContent: React.FC<Props> = ({ issue: givenIssue }) => {
	const [menuState, setMenuState] = useState<MenuStates>(MenuStates.none);

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

	if (mustFetchComments || !authData.user) {
		return null;
	}

	return (
		<div className={`fill ${styles.container}`} style={{ position: 'relative' }}>
			<div className={styles.innerContainer}>
				<h4>
					<span style={{ fontWeight: 400 }}>#{issue.issueKey}</span>
				</h4>
				<h1>{issue.summary}</h1>
				<h4>{t('description')}</h4>
				<p>{issue.description}</p>
				<Button onClick={() => setMenuState(MenuStates.commentsShown)}>{t('comments')}</Button>
				<Button onClick={() => setMenuState(MenuStates.commitsShown)}>{t('commits')}</Button>
				{menuState === MenuStates.commitsShown && (
					<Comment.Group
						style={{
							maxHeight: '50vh',
							overflowY: 'auto',
							width: '100%',
							maxWidth: '100%',
							marginBottom: 20,
						}}
					>
						{commits.map((commit) => (
							<IssueCommit commit={commit} key={commit.hash} />
						))}
					</Comment.Group>
				)}
				{menuState === MenuStates.commentsShown && (
					<Comment.Group
						style={{
							maxHeight: '50vh',
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
