import React, { useState } from 'react';
import { Form, Comment } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from './logic/actions';
import { useTranslation } from 'react-i18next';
import { RootState } from 'typings/rootState';
import { getUsername } from 'helpers/getUsername.helper';
import styles from './styles.module.scss';
import { getInitials } from 'helpers/getInitials.helper';

interface Props {
	onSubmit?: (text: string) => void;
	issueId: string;
}

const IssueCommentForm: React.FC<Props> = ({ onSubmit, issueId }) => {
	const [text, setText] = useState<string>('');
	const authData = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const submit = (event: React.FormEvent) => {
		event.preventDefault();

		if (!text) {
			return;
		}

		dispatch(
			addComment({
				issueId,
				text,
			}),
		);

		setText('');

		if (onSubmit) {
			onSubmit(text);
		}
	};

	if (!authData.user) {
		return null;
	}

	return (
		<Comment.Group style={{ width: '100%', maxWidth: '100%' }}>
			<Comment style={{ width: '100%' }}>
				{authData.user.avatar ? (
					<Comment.Avatar src={authData.user.avatar} />
				) : (
					<div className={`${styles.avatar} avatar`}>{getInitials(authData.user)}</div>
				)}
				<Comment.Content>
					<Comment.Author
						as="a"
						rel="noopener noreferrer"
						target="_blank"
						href={`/profile/${authData.user.id}`}
					>
						{getUsername(authData.user as WebApi.Entities.UserProfile)}
					</Comment.Author>
					<Comment.Text>
						<form onSubmit={submit}>
							<Form.Input
								fluid
								placeholder={t('enter_comment_text')}
								onChange={(event, data) => setText(data.value)}
								value={text}
							/>
						</form>
					</Comment.Text>
				</Comment.Content>
			</Comment>
		</Comment.Group>
	);
};

export default IssueCommentForm;
