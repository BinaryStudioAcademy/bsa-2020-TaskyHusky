import React, { useState, SyntheticEvent, useEffect } from 'react';
import styles from './styles.module.scss';
import { Header, Form, Divider, Segment, Button, Grid, List, Popup } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import * as actions from './logic/actions';
import PasswordInput from 'components/common/PasswordInput';
import { useTranslation } from 'react-i18next';
import validator from 'validator';

export const LoginPage: React.FC = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const authData = useSelector((rootState: RootState) => rootState.auth);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
	const [isEmailSubmitted, setIsEmailSubmitted] = useState<boolean>(false);
	const [redirectToRootPage, setRedirectToRootPage] = useState<boolean>(false);

	useEffect(() => {
		if (authData.isAuthorized) {
			setRedirectToRootPage(!redirectToRootPage);
		}
	}, [authData, redirectToRootPage]);

	const logInUser = (email: string, password: string) => {
		dispatch(actions.logInUserTrigger({ email, password }));
	};

	const handleContinueSubmit: (event: SyntheticEvent) => void = (event) => {
		event.preventDefault();
		setIsEmailSubmitted(true);
		setIsEmailValid(validator.isEmail(email)); // TODO: replace with request to server side via redux-saga when server side is ready
	};

	const handleLogInSubmit: (event: SyntheticEvent) => void = (event) => {
		event.preventDefault();
		setIsEmailValid(validator.isEmail(email));

		if (isEmailValid) {
			logInUser(email, password);
		}
	};

	const renderRootPage: JSX.Element | null = redirectToRootPage ? <Redirect to="/header" /> : null;

	const passwordInput = isEmailValid ? <PasswordInput onChange={(text) => setPassword(text)} /> : null;

	return (
		<>
			<Grid verticalAlign="middle" className={styles.grid}>
				<Grid.Column className={styles.column}>
					<Header as="h1" color="blue" className={styles.mainHeader}>
						{t('loginHeader')}
					</Header>
					<Segment>
						<Form onSubmit={isEmailSubmitted ? handleLogInSubmit : handleContinueSubmit}>
							<Popup
								className={styles.errorPopup}
								open={!isEmailValid && isEmailSubmitted}
								content={t('invalidEmail')}
								on={[]}
								trigger={
									<Form.Input
										error={!(isEmailValid || !isEmailSubmitted)}
										placeholder={t('email')}
										type="text"
										icon="at"
										onChange={(event) => {
											setEmail(event.target.value);
											setIsEmailSubmitted(false);
										}}
									/>
								}
							/>

							{passwordInput}
							<Button positive className={styles.continueButton}>
								{isEmailValid ? t('logIn') : t('continue')}
							</Button>
						</Form>
						<Divider />
						<List bulleted horizontal link className={styles.list}>
							<List.Item as="a" className={styles.listItem}>
								<Link to="/reset/password" children={t('cantLogin')} />
							</List.Item>
							<List.Item as="a" className={styles.listItem}>
								<Link to="/signup" children={t('signUpForAnAccount')} />
							</List.Item>
						</List>
					</Segment>
				</Grid.Column>
			</Grid>
			{renderRootPage}
		</>
	);
};

export default LoginPage;
