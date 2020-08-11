import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { requestChangePassword } from 'containers/ProfilePage/logiс/actions';
import { Header, Button, Form } from 'semantic-ui-react';
import SubmitedInput from 'components/SubmitedInput';

const SecurityManager = () => {
	const dispatch = useDispatch();
	const [passwords, setPasswords] = useState({
		oldPassword: '',
		newPassword: '',
		repeatedPassword: '',
	});
	const handleChange = (event: any) => {
		setPasswords({
			...passwords,
			[(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
		});
	};

	const onSubmit = () => {
		if (passwords.newPassword === passwords.repeatedPassword) {
			const { oldPassword, newPassword } = passwords;
			dispatch(requestChangePassword({ oldPassword, newPassword }));
			setPasswords({ ...passwords, oldPassword: '', newPassword: '', repeatedPassword: '' });
		}
	};
	return (
		<section className={styles.container}>
			<Header as="h3">Security</Header>
			<Header as="h4">Change your password</Header>
			<Form onSubmit={onSubmit}>
				<SubmitedInput
					contentData={{
						text: passwords.oldPassword,
						name: 'oldPassword',
						title: 'Current password',
						placeholder: 'Enter old password',
						type: 'password',
					}}
					handleChange={handleChange}
				/>
				<SubmitedInput
					contentData={{
						text: passwords.newPassword,
						name: 'newPassword',
						title: 'New password',
						placeholder: 'Enter new password',
						type: 'password',
					}}
					handleChange={handleChange}
				/>
				<SubmitedInput
					contentData={{
						text: passwords.repeatedPassword,
						name: 'repeatedPassword',
						title: 'Repeat password',
						placeholder: 'Repeat new password',
						type: 'password',
					}}
					handleChange={handleChange}
				/>
				<Button className={styles.submitButton} type="submit">
					Save changes
				</Button>
			</Form>
		</section>
	);
};

export default SecurityManager;
