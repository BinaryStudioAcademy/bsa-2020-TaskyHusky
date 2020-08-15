import React, { useState, useEffect } from 'react';
import { Form, Button, Divider, Popup, Segment, Image } from 'semantic-ui-react';
import PasswordInput from 'components/common/PasswordInput';
import validator from 'validator';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'containers/LoginPage/logic/actions';
import { RootState } from 'typings/rootState';
import styles from './styles.module.scss';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useTranslation } from 'react-i18next';
import Spinner from 'components/common/Spinner';
import { NotificationManager } from 'react-notifications';
import iconGoogle from 'assets/images/icon-google.svg';

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

	const googleAuth = (user: GoogleLoginResponse | GoogleLoginResponseOffline) => {
		dispatch(actions.sendGoogleAuth({ user }));
	};

	const googleAuthFailed = () => {
		NotificationManager.error('Error google authentication', 'Error', 4000);
	};

	const googleBtn = (props: { onClick: () => void; disabled?: boolean }) => (
		<button onClick={props.onClick} className={styles.google_btn}>
			<Image src={iconGoogle} className={styles.google_logo} />
			<span className={styles.google_title}> Login</span>
		</button>
	);

	return authState.loading ? (
		<Segment className={styles.loading_wrapper}>
			<Spinner />
		</Segment>
	) : (
		<Form onSubmit={submit}>
			{redirecting ? <Redirect to="/" /> : ''}
			<Popup
				className={styles.errorPopup}
				on={[]}
				open={!firstNameValid}
				content={t('first_name_required')}
				position="top center"
				trigger={
					<Form.Input
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
			<Form.Input placeholder={t('last_name')} onChange={(event, data) => setLastName(data.value)} />
			<Popup
				className={styles.errorPopup}
				on={[]}
				open={!emailValid}
				position="top center"
				content={t('invalid_email')}
				trigger={
					<Form.Input
						type="email"
						icon="at"
						placeholder={t('email')}
						onChange={(event, data: { value: string }) => {
							setEmail(data.value);
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
			<Button disabled={buttonDisabled} fluid positive type="submit">
				{t('sign_up')}
			</Button>
			<Divider horizontal>{t('or')}</Divider>
			<GoogleLogin
				clientId="1004182396963-58h0qlvimlv07tepibt6m6t5omejn2h7.apps.googleusercontent.com"
				buttonText="Login"
				render={(props) => googleBtn(props)}
				onSuccess={googleAuth}
				onFailure={googleAuthFailed}
				cookiePolicy={'single_host_origin'}
			/>
		</Form>
	);
};

export default SignUpForm;
