import React from 'react';
import { Comment } from 'semantic-ui-react';
import { getUsername } from 'helpers/getUsername.helper';
import moment from 'moment';
import styles from './styles.module.scss';

interface Props {
	comment: WebApi.Result.IssueCommentResult;
}

const IssueComment: React.FC<Props> = ({ comment }) => {
	return (
		<Comment>
			{comment.creator.avatar ? (
				<Comment.Avatar src={comment.creator.avatar} />
			) : (
				<div className={`${styles.avatar} avatar`}>RM</div>
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
				<Comment.Text>{comment.text}</Comment.Text>
			</Comment.Content>
		</Comment>
	);
};

export default IssueComment;
