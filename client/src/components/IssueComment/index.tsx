import React from 'react';
import { Comment } from 'semantic-ui-react';
import { getUsername } from 'helpers/getUsername.helper';
import moment from 'moment';
import styles from './styles.module.scss';
import { getInitials } from 'helpers/getInitials.helper';

interface Props {
	comment: WebApi.Result.IssueCommentResult;
}

const IssueComment: React.FC<Props> = ({ comment }) => {
	let displayText: JSX.Element[] = [];
	let lastMatchIndex = 0;
	const matches = comment.text.match(/<mention of='[a-zA-Z0-9-]*'>[a-zA-Z0-9 ]*<\/mention>/g);
	console.log(matches);

	if (matches) {
		for (const matchIndex in matches) {
			const match = matches[matchIndex];
			const currMatchIndex = comment.text.indexOf(match, lastMatchIndex);
			const linkName = '@' + match.slice(match.indexOf('>', 1) + 1, -10);
			const firstIdIndex = match.indexOf("'") + 1;
			const lastIdIndex = match.indexOf("'", firstIdIndex + 1);
			const linkHREF = '/profile/' + match.slice(firstIdIndex, lastIdIndex);

			displayText.push(
				<React.Fragment key={matchIndex + '-f'}>
					{comment.text.slice(lastMatchIndex, currMatchIndex)}
				</React.Fragment>,
			);

			displayText.push(
				<a rel="noopener noreferrer" target="_blank" href={linkHREF} key={matchIndex + '-a'}>
					{linkName}
				</a>,
			);

			lastMatchIndex = currMatchIndex + match.length;
		}

		displayText.push(
			<React.Fragment key={matches.length}>
				{comment.text.slice(lastMatchIndex, comment.text.length)}
			</React.Fragment>,
		);
	} else {
		displayText = [<React.Fragment key={0}>{comment.text}</React.Fragment>];
	}

	return (
		<Comment style={{ width: '100%', marginBottom: 20 }}>
			{comment.creator.avatar ? (
				<Comment.Avatar src={comment.creator.avatar} />
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
			</Comment.Content>
		</Comment>
	);
};

export default IssueComment;
