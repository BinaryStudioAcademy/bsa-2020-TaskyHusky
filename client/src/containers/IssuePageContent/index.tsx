import React, { useState, useEffect } from 'react';
import { Comment } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import IssueCommentForm from 'components/IssueCommentForm';
import { getComments } from 'services/issue.service';
import IssueComment from 'components/IssueComment';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import styles from './styles.module.scss';
import IssuePageInfoColumn from 'components/IssuePageInfoColumn';
import { useIO } from 'hooks/useIO';

interface Props {
	issue: WebApi.Result.IssueResult;
}

const IssuePageContent: React.FC<Props> = ({ issue }) => {
	const [comments, setComments] = useState<WebApi.Result.IssueCommentResult[]>([]);
	const [mustFetchComments, setMustFetchComments] = useState<boolean>(true);
	const { t } = useTranslation();
	const authData = useSelector((state: RootState) => state.auth);
	const io = useIO(WebApi.IO.Types.Issue);

	const { watchers, ...issueForDefault } = issue;

	const initialIssue = {
		...issueForDefault,
		boardColumn: issue.boardColumn ? issue.boardColumn.id : undefined,
		type: issue.type.id,
		priority: issue.priority.id,
		creator: issue.creator.id,
		assigned: issue.assigned ? issue.assigned.id : undefined,
	};

	useEffect(() => {
		if (mustFetchComments) {
			getComments(issue.id).then(setComments);
			setMustFetchComments(false);
		}
	}, [mustFetchComments, issue.id]);

	if (mustFetchComments || !authData.user || !io) {
		return null;
	}

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

	return (
		<div className={`fill ${styles.container}`} style={{ position: 'relative' }}>
			<div className={styles.innerContainer}>
				<h4>
					<span style={{ fontWeight: 400 }}>#{issue.issueKey}</span>
				</h4>
				<h1>{issue.summary}</h1>
				<h4>{t('description')}</h4>
				<p>{issue.description}</p>
				<h3>{t('comments')}</h3>
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
				<IssueCommentForm issueId={issue.id} />
			</div>
			<IssuePageInfoColumn issue={issue} initialIssue={initialIssue} />
		</div>
	);
};

export default IssuePageContent;
