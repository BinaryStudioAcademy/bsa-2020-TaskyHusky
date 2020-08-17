import React, { useState, useEffect } from 'react';
import { Form, Comment, Popup, Dropdown } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from './logic/actions';
import { useTranslation } from 'react-i18next';
import { RootState } from 'typings/rootState';
import { getUsername } from 'helpers/getUsername.helper';
import styles from './styles.module.scss';
import { getInitials } from 'helpers/getInitials.helper';
import { requestTeammates } from 'services/user.service';

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
	const { t } = useTranslation();

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

		const matches = text.match(/@[a-zA-Z0-9 ]*>/g);
		let displayText = text;

		if (matches) {
			for (const match of matches) {
				const mentionUsername = match.slice(1, -1);
				const mentionUser = (users ?? []).find((user) => getUsername(user) === mentionUsername);

				if (!mentionUser) continue;

				displayText = displayText.replace(
					match,
					` <mention of='${mentionUser.id}'>${mentionUsername}</mention> `,
				);
			}
		}

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
							<Popup
								trigger={
									<Form.Input
										fluid
										placeholder={t('enter_comment_text')}
										onChange={(event, data) => {
											if (popupOpen && data.value[data.value.length - 1] !== '@') {
												setPopupOpen(false);
											}

											setText(data.value);
										}}
										onKeyUp={(event: React.KeyboardEvent) => {
											if (event.key === 'Enter' && popupOpen) {
												event.preventDefault();
											}

											if (event.key === '@') {
												setPopupOpen(true);
											}
										}}
										value={text}
									/>
								}
								content={
									<Dropdown
										selection
										options={userOptions}
										open
										search={(options, query) =>
											options.filter((opt) =>
												(opt.text as string).toLowerCase().includes(query.toLowerCase()),
											)
										}
										onChange={(event, data) => {
											const index: number = text.lastIndexOf('@');
											setPopupOpen(false);

											if (data.value) {
												setText(
													text.substring(0, index + 1) +
														data.value +
														'>' +
														text.substring(index + 1, text.length),
												);
											}
										}}
									/>
								}
								position="top center"
								open={popupOpen}
								closeOnTriggerMouseLeave
							/>
						</form>
					</Comment.Text>
				</Comment.Content>
			</Comment>
		</Comment.Group>
	);
};

export default IssueCommentForm;
