import React, { useState, SyntheticEvent, useEffect, useCallback } from 'react';
import styles from './styles.module.scss';
import { Form, Divider, Segment, Button, Grid, Popup, Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './logic/actions';
import PasswordInput from 'components/common/PasswordInput';
import { useTranslation } from 'react-i18next';
import validator from 'validator';
import { normalizeEmail } from 'helpers/email.helper';
import iconGoogle from 'assets/images/icon-google.svg';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { RootState } from 'typings/rootState';
import { GoogleAuth } from 'constants/GoogleLogin';
import { NotificationManager } from 'react-notifications';

export const LoginPage: React.FC = () => {
	const history = useHistory();
	const authState = useSelector((rootState: RootState) => rootState.auth);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
	const [isEmailSubmitted, setIsEmailSubmitted] = useState<boolean>(false);

	const logInUser: (email: string, password: string) => void = (email, password) => {
		dispatch(actions.logInUserTrigger({ email, password }));
	};

	const checkEmail: () => void = useCallback(() => {
		dispatch(actions.checkEmailTrigger({ email }));
	}, [dispatch, email]);

	const checkEmailReset: () => void = useCallback(() => {
		dispatch(actions.checkEmailReset());
	}, [dispatch]);

	useEffect(() => {
		if (isEmailValid && isEmailSubmitted) {
			checkEmail();
		}
	}, [isEmailValid, isEmailSubmitted, checkEmail]);

	useEffect(() => {
		if (!authState.isEmailInDB && authState.isEmailInDB !== null && isEmailSubmitted) {
			NotificationManager.error(t('user_does_not_exist'), t('error'), 4000);
			setEmail('');
			setIsEmailSubmitted(false);
			checkEmailReset();
		}
	}, [authState.isEmailInDB, isEmailSubmitted, history, checkEmailReset]);

	const handleSubmit: (event: SyntheticEvent) => void = (event) => {
		event.preventDefault();
		setIsEmailSubmitted(true);
		setIsEmailValid(validator.isEmail(email));

		if (isEmailValid && authState.isEmailInDB) {
			logInUser(email, password);
		}
	};

	const passwordInput: JSX.Element | null =
		authState.isEmailInDB && isEmailSubmitted ? <PasswordInput onChange={(text) => setPassword(text)} /> : null;

	const googleAuth = (user: GoogleLoginResponse | GoogleLoginResponseOffline) => {
		dispatch(actions.sendGoogleAuth({ user }));
	};

	const googleBtn = (props: { onClick: () => void; disabled?: boolean }) => (
		<button onClick={props.onClick} className={styles.google_btn}>
			<Image src={iconGoogle} className={styles.google_logo} />
			<span className={styles.google_title}> {t('sign_up_with_google')}</span>
		</button>
	);

	return (
		<Grid verticalAlign="middle" className={styles.grid}>
			<Grid.Column className={styles.column}>
				<Segment className={styles.loginBody}>
					<Form onSubmit={handleSubmit}>
						<Popup
							className={styles.errorPopup}
							open={!isEmailValid && isEmailSubmitted}
							content={t('invalid_email')}
							on={[]}
							trigger={
								<Form.Input
									className={styles.inputField}
									error={!(isEmailValid || !isEmailSubmitted)}
									placeholder={t('email')}
									type="text"
									icon="at"
									value={email}
									onChange={(event) => {
										setEmail(normalizeEmail(event.target.value));
										if (normalizeEmail(event.target.value) !== email && isEmailSubmitted) {
											setIsEmailSubmitted(false);
											checkEmailReset();
										}
									}}
								/>
							}
						/>

						{passwordInput}
						<Button className={styles.continueButton} disabled={authState.loading}>
							{isEmailValid ? t('log_in') : t('continue')}
						</Button>
						<Divider horizontal className={styles.divider}>
							{t('or')}
						</Divider>
						<GoogleLogin
							clientId={GoogleAuth.CLIENT_ID}
							buttonText="Login"
							render={(props) => googleBtn(props)}
							onSuccess={googleAuth}
							cookiePolicy={GoogleAuth.COOKIE_POLICY}
						/>
					</Form>
				</Segment>
			</Grid.Column>
		</Grid>
	);
};

export default LoginPage;
