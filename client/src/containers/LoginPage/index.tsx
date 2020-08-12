import React, { useState, SyntheticEvent, useEffect, useCallback } from 'react';
import styles from './styles.module.scss';
import { Header, Form, Divider, Segment, Button, Grid, List, Popup } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './logic/actions';
import PasswordInput from 'components/common/PasswordInput';
import { useTranslation } from 'react-i18next';
import validator from 'validator';
import { fixEmail } from 'helpers/fixEmail.helper';

import { RootState } from 'typings/rootState';

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
			history.push('/signup');
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

	return (
		<>
			<Grid verticalAlign="middle" className={styles.grid}>
				<Grid.Column className={styles.column}>
					<Header as="h1" color="blue" className={styles.mainHeader}>
						{t('login_header')}
					</Header>
					<Segment>
						<Form onSubmit={handleSubmit}>
							<Popup
								className={styles.errorPopup}
								open={!isEmailValid && isEmailSubmitted}
								content={t('invalid_email')}
								on={[]}
								trigger={
									<Form.Input
										error={!(isEmailValid || !isEmailSubmitted)}
										placeholder={t('email')}
										type="text"
										icon="at"
										value={email}
										onChange={(event) => {
											setEmail(fixEmail(event.target.value));
											if (fixEmail(event.target.value) !== email && isEmailSubmitted) {
												setIsEmailSubmitted(false);
												checkEmailReset();
											}
										}}
									/>
								}
							/>

							{passwordInput}
							<Button positive className={styles.continueButton}>
								{isEmailValid ? t('log_in') : t('continue')}
							</Button>
						</Form>
						<Divider />
						<List bulleted horizontal link className={styles.list}>
							<List.Item className={styles.listItem}>
								<Link to="/reset/password" children={t('cant_login')} />
							</List.Item>
							<List.Item className={styles.listItem}>
								<Link to="/signup" children={t('sign_up_for_an_account')} />
							</List.Item>
						</List>
					</Segment>
				</Grid.Column>
			</Grid>
		</>
	);
};

export default LoginPage;
