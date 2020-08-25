import React, { useState, useEffect } from 'react';
import { Comment } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import IssueCommentForm from 'components/IssueCommentForm';
import { getComments } from 'services/issue.service';
import IssueComment from 'components/IssueComment';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import { generateRandomString } from 'helpers/randomString.helper';
import styles from './styles.module.scss';
import IssuePageInfoColumn from 'components/IssuePageInfoColumn';

interface Props {
	issue: WebApi.Result.IssueResult;
}

const IssuePageContent: React.FC<Props> = ({ issue }) => {
	const [comments, setComments] = useState<WebApi.Result.IssueCommentResult[]>([]);
	const [mustFetchComments, setMustFetchComments] = useState<boolean>(true);
	const { t } = useTranslation();
	const authData = useSelector((state: RootState) => state.auth);

	const { watchers, ...issueForDefault } = issue;

	const initialIssue = {
		...issueForDefault,
		type: issue.type.id,
		priority: issue.priority.id,
		creator: issue.creator.id,
		assigned: issue.assigned ? issue.assigned.id : undefined,
		boardColumn: issue.boardColumn,
		status: issue.status?.id,
	};

	useEffect(() => {
		if (mustFetchComments) {
			getComments(issue.id).then(setComments);
			setMustFetchComments(false);
		}
	}, [mustFetchComments, issue.id]);

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
				<IssueCommentForm
					issueId={issue.id}
					onSubmit={(text) => {
						setComments([
							...comments,
							{
								id: generateRandomString(6),
								creator: authData.user,
								createdAt: new Date(),
								text,
								issue: issue.id,
							},
						]);
					}}
				/>
			</div>
			<IssuePageInfoColumn issue={issue} initialIssue={initialIssue} />
		</div>
	);
};

export default IssuePageContent;
