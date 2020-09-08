import React from 'react';
import { Comment, Icon } from 'semantic-ui-react';
import { getUsername } from 'helpers/getUsername.helper';
import moment from 'moment';
import styles from './styles.module.scss';
import { getInitials } from 'helpers/getInitials.helper';
import { getJSXText } from 'helpers/getDisplayCommentText.helper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import { deleteComment } from 'components/IssueCommentForm/logic/actions';
import { useTranslation } from 'react-i18next';
import CopyToClipboard from 'react-copy-to-clipboard';
import { NotificationManager } from 'react-notifications';

interface Props {
	comment: WebApi.Result.IssueCommentResult;
}

const IssueComment: React.FC<Props> = ({ comment }) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const displayText = getJSXText(comment);
	const user = useSelector((state: RootState) => state.auth.user);

	const deleteCurrentComment = () => {
		dispatch(deleteComment({ id: comment.id }));
		NotificationManager.success(t('the_comments_text_is_copied_to_clipboard'), '', 4000);
	};

	const renderActions =
		user && user.id === comment.creator.id ? (
			<Comment.Actions>
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<CopyToClipboard text={comment.text} onCopy={deleteCurrentComment}>
						<Comment.Action className={styles.redOnHover}>
							<Icon name="trash alternate outline" />
							{t('delete')}
						</Comment.Action>
					</CopyToClipboard>
				</div>
			</Comment.Actions>
		) : (
			''
		);

	return (
		<Comment style={{ width: '100%', marginBottom: 20 }}>
			{comment.creator.avatar ? (
				<div className="avatar">
					<img src={comment.creator.avatar} alt="Sender avatar" style={{ borderRadius: '50%' }} />
				</div>
			) : (
				<div className={`${styles.avatar} avatar`}>{getInitials(comment.creator)}</div>
			)}
			<Comment.Content>
				<Comment.Author
					as="a"
					rel="noopener noreferrer"
					target="_blank"
					href={`/profile/${comment.creator.id}`}
				>
					{getUsername(comment.creator)}
				</Comment.Author>
				<Comment.Metadata>{moment(comment.createdAt).format('LLL')}</Comment.Metadata>
				<Comment.Text>{displayText}</Comment.Text>
				{renderActions}
			</Comment.Content>
		</Comment>
	);
};

export default IssueComment;
