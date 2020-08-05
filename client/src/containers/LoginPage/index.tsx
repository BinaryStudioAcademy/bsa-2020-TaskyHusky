import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Header, Form, Divider, Segment, Button, Grid, List, Popup } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import PasswordInput from '../../components/common/PasswordInput';
import { loginUser } from 'services/auth.service';
import { setToken } from 'helpers/setToken.helper';
import validator from 'validator';
import { getUserByEmail } from 'services/user.service';

export const LoginPage: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
	const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
	const [isEmailSubmitted, setIsEmailSubmitted] = useState<boolean>(false);
	const [redirectToForgetPassword, setRedirectToForgetPassword] = useState<boolean>(false);
	const [redirectToSignUp, setRedirectToSignUp] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleContinueSubmit = async () => {
		if (!isEmailSubmitted) {
			setIsEmailSubmitted(true);
			const emailSpellValid = validator.isEmail(email);

			if (!emailSpellValid) {
				return setIsEmailValid(false);
			}

			const checkingUser = await getUserByEmail(email);
			setIsEmailValid(Boolean(checkingUser));
		} else {
			if (!email || !password || !isEmailValid || !isPasswordValid) {
				return;
			}

			setIsLoading(true);
			const res = await loginUser(email, password);

			if (res && res.jwtToken) {
				setToken(res.jwtToken);
			}

			setIsLoading(false);

			window.location.replace('/');
		}
	};

	const toggleForgetPasswordHandler: () => void = () => {
		setRedirectToForgetPassword(true);
	};

	const toggleSignUpHandler: () => void = () => {
		setRedirectToSignUp(true);
	};

	const renderForgetPassword: JSX.Element | null = redirectToForgetPassword ? (
		<Redirect to="/login/resetpassword" />
	) : null;

	const renderSignUp: JSX.Element | null = redirectToSignUp ? <Redirect to="/signup" /> : null;

	const passwordInput = isEmailValid ? (
		<PasswordInput onChangeValid={(valid) => setIsPasswordValid(valid)} onChange={(text) => setPassword(text)} />
	) : null;

	return (
		<>
			<Grid verticalAlign="middle" className={styles.grid}>
				<Grid.Column className={styles.column}>
					<Header as="h1" className={styles.mainHeader} color="blue">
						Log in to TaskyHusky
					</Header>
					<Segment>
						<Form onSubmit={handleContinueSubmit}>
							<Popup
								className={styles.errorPopup}
								open={!(isEmailValid || !isEmailSubmitted)}
								content="Please enter a valid and existing email"
								on={[]}
								trigger={
									<Form.Input
										icon="at"
										error={!(isEmailValid || !isEmailSubmitted)}
										placeholder="Email"
										type="text"
										onChange={(event, data) => {
											setEmail(data.value);
											setIsEmailSubmitted(false);
										}}
									/>
								}
							/>
							{passwordInput}
							<Button
								positive
								className={styles.continueButton}
								loading={isLoading}
								disabled={!isEmailSubmitted ? !email : !email || !password}
							>
								{isEmailValid ? 'Log in' : 'Continue'}
							</Button>
						</Form>
						<Divider />
						<List bulleted horizontal link className={styles.list}>
							<List.Item as="a" className={styles.listItem} onClick={toggleForgetPasswordHandler}>
								Can&apos;t login
							</List.Item>
							<List.Item as="a" className={styles.listItem} onClick={toggleSignUpHandler}>
								Sign up for an account
							</List.Item>
						</List>
					</Segment>
				</Grid.Column>
			</Grid>
			{renderForgetPassword}
			{renderSignUp}
		</>
	);
};

export default LoginPage;
