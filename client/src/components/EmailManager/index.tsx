import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import styles from './styles.module.scss';
import { Header, Button, Checkbox, Select, Form } from 'semantic-ui-react';
import { requestUpdateUser } from 'containers/ProfilePage/logiс/actions';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';
import SubmitedInput from 'components/SubmitedInput';

const EmailManager = () => {
	const dispatch = useDispatch();
	const email = useSelector((state: RootState) => state.user.email);
	const [textData, setTextData] = useState('');
	const handleChange = (event: any) => {
		setTextData((event.target as HTMLInputElement).value);
	};

	const updateUserField = () => {
		if (textData !== email) {
			dispatch(requestUpdateUser({ userData: { email: textData.trim() } } as Partial<UserProfileState>));
		}
	};

	const notifaictionsOptions = [
		{ key: 'send', value: true, text: 'Send me email notifications' },
		{ key: 'notSend', value: false, text: 'Do not send me email notifications' },
	];

	return (
		<section className={styles.container}>
			<Header as="h3">Email</Header>
			<Header as="h4">Change Email</Header>
			<p>Your current email adress is {email}</p>
			<Form onSubmit={updateUserField}>
				<Form.Field>
					<SubmitedInput
						contentData={{
							text: textData,
							name: 'email',
							title: 'New Email Adress',
							placeholder: 'Enter new email adress',
							type: 'text',
						}}
						handleChange={handleChange}
					/>
					<Button type="submit" className={styles.submitButton}>
						{' '}
						Save changes
					</Button>
				</Form.Field>
			</Form>
			<Header as="h4">Email notifications</Header>
			<p>Email notifications for issue activity</p>
			<Select
				placeholder="Choose option for email notifications"
				className={styles.select}
				options={notifaictionsOptions}
			/>
			<p>Get email updates for issue activity when:</p>
			<Checkbox className={styles.checkbox} label="You are watching the issue" />
			<Checkbox className={styles.checkbox} label="You are the reporter" />
			<Checkbox className={styles.checkbox} label="You are the asignee for issue" />
			<Checkbox className={styles.checkbox} label="Someone mentiones you" />
			<Checkbox className={styles.checkbox} label="You make changes to the issue" />
		</section>
	);
};

export default EmailManager;
