import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { requestChangePassword } from 'containers/ProfilePage/logiс/actions';
import { Header, Button, Form, Popup } from 'semantic-ui-react';
import SubmitedInput from 'components/SubmitedInput';
import PasswordCheck from 'components/PasswordCheck';

const SecurityManager = () => {
	const dispatch = useDispatch();
	const [passwords, setPasswords] = useState({
		oldPassword: '',
		newPassword: '',
		repeatedPassword: '',
	});
	const [isRepeatedPassValid, setIsRepeatedPassValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const handleChange = (event: any) => {
		setPasswords({
			...passwords,
			[(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
		});
	};

	const onBlurPass = () => {
		setIsPasswordValid(passwords.newPassword.length >= 6);
	};

	const onBlurRepeated = () => {
		setIsRepeatedPassValid(
			!!passwords.newPassword &&
				!!passwords.repeatedPassword &&
				passwords.newPassword === passwords.repeatedPassword,
		);
	};
	const onSubmit = () => {
		if (isPasswordValid && isRepeatedPassValid) {
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
					text={passwords.oldPassword}
					propKey="oldPassword"
					title="Current password"
					placeholder="Enter old password"
					type="password"
					handleChange={handleChange}
				/>
				<Popup
					className={styles.errorPopup}
					open={!isPasswordValid}
					content="Password should be more than 6 symbols"
					on={[]}
					trigger={
						<SubmitedInput
							text={passwords.newPassword}
							propKey="newPassword"
							title="New password"
							placeholder="Enter new password"
							type="password"
							handleChange={handleChange}
							isValid={isPasswordValid}
							onBlur={onBlurPass}
						/>
					}
				/>

				<PasswordCheck passLength={passwords.newPassword.length} />
				<Popup
					className={styles.errorPopup}
					open={!isRepeatedPassValid}
					content="Passwords should be equal"
					on={[]}
					trigger={
						<SubmitedInput
							text={passwords.repeatedPassword}
							propKey="repeatedPassword"
							title="Repeat password"
							placeholder="Repeat new password"
							type="password"
							handleChange={handleChange}
							isValid={isRepeatedPassValid}
							onBlur={onBlurRepeated}
						/>
					}
				/>
				<Button className={styles.submitButton} type="submit">
					Save changes
				</Button>
			</Form>
		</section>
	);
};

export default SecurityManager;
