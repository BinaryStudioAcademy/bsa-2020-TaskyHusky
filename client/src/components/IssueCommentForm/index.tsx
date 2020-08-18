import React, { useState, useEffect } from 'react';
import { Comment } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from './logic/actions';
import { RootState } from 'typings/rootState';
import { getUsername } from 'helpers/getUsername.helper';
import styles from './styles.module.scss';
import { getInitials } from 'helpers/getInitials.helper';
import { requestTeammates } from 'services/user.service';
import IssueCommentTextInput from '../IssueCommentTextInput';
import { getXMLText } from 'helpers/getDisplayCommentText.helper';

interface Props {
	onSubmit?: (text: string) => void;
	issueId: string;
}

interface Option {
	key: string | number;
	value: any;
	text: string | JSX.Element | JSX.Element[];
}

const IssueCommentForm: React.FC<Props> = ({ onSubmit, issueId }) => {
	const [users, setUsers] = useState<WebApi.Entities.UserProfile[]>([]);
	const [mustFetchUsers, setMustFetchUsers] = useState<boolean>(true);
	const [text, setText] = useState<string>('');
	const [popupOpen, setPopupOpen] = useState<boolean>(false);
	const authData = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (mustFetchUsers) {
			if (authData.user) {
				requestTeammates(authData.user.id).then(setUsers);
			}

			setMustFetchUsers(false);
		}
	}, [mustFetchUsers, authData.user]);

	const submit = (event: React.FormEvent) => {
		event.preventDefault();

		if (!text) {
			return;
		}

		const displayText = getXMLText(text, users);

		dispatch(
			addComment({
				issueId,
				text: displayText,
			}),
		);

		if (onSubmit) {
			onSubmit(displayText);
		}

		setText('');
	};

	if (!authData.user || mustFetchUsers) {
		return null;
	}

	const userOptions: Option[] = ([{ key: 0, value: null, text: '' }] as Option[]).concat(
		users.map((user) => ({
			key: user.id,
			value: getUsername(user),
			text: getUsername(user),
		})),
	);

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
							<IssueCommentTextInput
								text={text}
								setText={setText}
								popupOpen={popupOpen}
								setPopupOpen={setPopupOpen}
								userOptions={userOptions}
							/>
						</form>
					</Comment.Text>
				</Comment.Content>
			</Comment>
		</Comment.Group>
	);
};

export default IssueCommentForm;
