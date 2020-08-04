import React, { useState } from 'react';
import { Form, Button, Divider, Icon } from 'semantic-ui-react';
import PasswordInput from 'components/common/PasswordInput';
import validator from 'validator';
import { registerUser } from 'services/auth.service';
import { setToken } from 'helpers/setToken.helper';

const SignUpForm: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [emailValid, setEmailValid] = useState<boolean>(true);
	const [password, setPassword] = useState<string>('');
	const [passwordValid, setPasswordValid] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);

	const buttonDisabled = !(password && email && passwordValid && emailValid);

	const submit = async () => {
		if (buttonDisabled) {
			return;
		}

		setLoading(true);
		const result: WebApi.Result.UserAuthResult | null = await registerUser(email, password);
		setLoading(false);

		if (result) {
			setToken(result.jwtToken);
			window.location.replace('/');
		}
	};

	return (
		<Form onSubmit={submit}>
			<Form.Input
				type="email"
				iconPosition="left"
				icon="at"
				placeholder="Email"
				onChange={(event, data: { value: string }) => {
					setEmail(data.value);
					setEmailValid(true);
				}}
				onBlur={() => setEmailValid(validator.isEmail(email))}
				error={!emailValid}
			/>
			<PasswordInput onChange={setPassword} onChangeValid={setPasswordValid} />
			<Button disabled={buttonDisabled} fluid positive loading={loading} type="submit">
				Sign up
			</Button>
			<Divider horizontal>Or</Divider>
			<Button type="button">
				<Icon name="google" />
				Sign up with Google
			</Button>
		</Form>
	);
};

export default SignUpForm;
