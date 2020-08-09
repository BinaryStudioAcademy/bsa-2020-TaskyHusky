import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Header, Button, Form } from 'semantic-ui-react';
import SubmitedInput from 'components/SubmitedInput';

const SecurityManager = () => {
	const [passwords, setPassword] = useState({
		oldPassword: '',
		newPassword: '',
		repeatedPassword: '',
	});
	const handleChange = (event: any) => {
		setPassword({
			...passwords,
			[(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).name,
		});
	};

	const onSubmit = () => {
		console.log('change password');
	};
	return (
		<section className={styles.container}>
			<Header as="h3">Security</Header>
			<Header as="h4">Change your password</Header>
			<Form onSubmit={onSubmit}>
				<Form.Field>
					<SubmitedInput
						contentData={{
							text: passwords.oldPassword,
							name: 'oldPassword',
							title: 'Current password',
							placeholder: 'Enter new email adress',
						}}
						handleChange={handleChange}
					/>
					<SubmitedInput
						contentData={{
							text: passwords.newPassword,
							name: 'newPassword',
							title: 'New password',
							placeholder: 'Enter new password',
						}}
						handleChange={handleChange}
					/>
					<SubmitedInput
						contentData={{
							text: passwords.repeatedPassword,
							name: 'repeatedPassword',
							title: 'Repeat password',
							placeholder: 'Enter new password',
						}}
						handleChange={handleChange}
					/>
					<Button className={styles.submitButton} type="submit">
						Save changes
					</Button>
				</Form.Field>
			</Form>
		</section>
	);
};

export default SecurityManager;
