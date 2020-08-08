import React, { useState, useEffect } from 'react';
import { Form, Button, Divider, Icon, Popup } from 'semantic-ui-react';
import PasswordInput from 'components/common/PasswordInput';
import validator from 'validator';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'containers/LoginPage/logic/actions';
import { RootState } from 'typings/rootState';
import styles from './styles.module.scss';

const SignUpForm: React.FC = () => {
	const dispatch = useDispatch();
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
		<Form onSubmit={submit}>
			{redirecting ? <Redirect to="/" /> : ''}
			<Popup
				className={styles.errorPopup}
				on={[]}
				open={!firstNameValid}
				content="First name is required"
				position="top center"
				trigger={
					<Form.Input
						placeholder="First name"
						onChange={(event, data) => {
							setFirstName(data.value);
							setFirstNameValid(true);
						}}
						onBlur={() => setFirstNameValid(Boolean(firstName))}
						error={!firstNameValid}
					/>
				}
			/>
			<Form.Input placeholder="Last name" onChange={(event, data) => setLastName(data.value)} />
			<Popup
				className={styles.errorPopup}
				on={[]}
				open={!emailValid}
				position="top center"
				content="Enter a valid email"
				trigger={
					<Form.Input
						type="email"
						icon="at"
						placeholder="Email"
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
				content="Password must be at least 6 characters long"
				trigger={<PasswordInput onChange={setPassword} onChangeValid={setPasswordValid} />}
			/>
			<Button disabled={buttonDisabled} fluid positive type="submit">
				Sign up
			</Button>
			<Divider horizontal>Or</Divider>
			<Button type="button" fluid>
				<Icon name="google" />
				Log in with Google
			</Button>
		</Form>
	);
};

export default SignUpForm;
