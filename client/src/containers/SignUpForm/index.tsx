import React, { useState, useEffect } from 'react';
import { Form, Button, Popup } from 'semantic-ui-react';
import PasswordInput from 'components/common/PasswordInput';
import validator from 'validator';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'containers/LoginPage/logic/actions';
import { RootState } from 'typings/rootState';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { normalizeEmail } from 'helpers/email.helper';

const SignUpForm: React.FC = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const authState = useSelector((rootState: RootState) => rootState.auth);

	const [email, setEmail] = useState<string>('');
	const [emailValid, setEmailValid] = useState<boolean>(true);
	const [password, setPassword] = useState<string>('');
	const [passwordValid, setPasswordValid] = useState<boolean>(true);
	const [firstName, setFirstName] = useState<string>('');
	const [firstNameValid, setFirstNameValid] = useState<boolean>(true);
	const [lastName, setLastName] = useState<string>('');
	const [redirecting, setRedirecting] = useState<boolean>(false);
	const buttonDisabled = !(password && passwordValid && email && emailValid && firstName && firstNameValid);

	useEffect(() => {
		if (authState.isAuthorized) {
			setRedirecting(true);
		}
	}, [authState.isAuthorized, redirecting]);

	const submit = async () => {
		if (buttonDisabled) {
			return;
		}

		dispatch(actions.registerUserTrigger({ email, password, firstName, lastName }));
	};

	return (
		<Form onSubmit={submit} className={styles.registerForm}>
			{redirecting ? <Redirect to="/" /> : ''}
			<Popup
				className={styles.errorPopup}
				on={[]}
				open={!firstNameValid}
				content={t('first_name_required')}
				position="top center"
				trigger={
					<Form.Input
						className={styles.inputField}
						placeholder={t('first_name')}
						onChange={(event, data) => {
							setFirstName(data.value);
							setFirstNameValid(true);
						}}
						onBlur={() => setFirstNameValid(Boolean(firstName))}
						error={!firstNameValid}
					/>
				}
			/>
			<Form.Input
				className={styles.inputField}
				placeholder={t('last_name')}
				onChange={(event, data) => setLastName(data.value)}
			/>
			<Popup
				className={styles.errorPopup}
				on={[]}
				open={!emailValid}
				position="top center"
				content={t('invalid_email')}
				trigger={
					<Form.Input
						className={styles.inputField}
						type="text"
						icon="at"
						placeholder={t('email')}
						value={email}
						onChange={(event) => {
							setEmail(normalizeEmail(event.target.value));
							setEmailValid(true);
						}}
						onBlur={() => setEmailValid(validator.isEmail(email))}
						error={!emailValid}
					/>
				}
			/>
			<Popup
				className={styles.errorPopup}
				on={[]}
				open={!passwordValid}
				position="bottom center"
				content={t('invalid_password')}
				trigger={<PasswordInput onChange={setPassword} onChangeValid={setPasswordValid} />}
			/>
			<Button disabled={buttonDisabled} fluid className={styles.continueButton} type="submit">
				{t('sign_up')}
			</Button>
		</Form>
	);
};

export default SignUpForm;
