import React, { useState } from 'react';
import { Form, Button, Divider, Icon } from 'semantic-ui-react';
import PasswordInput from 'components/PasswordInput';
import validator from 'validator';

const SignUpForm: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [emailValid, setEmailValid] = useState<boolean>(true);
	const [password, setPassword] = useState<string>('');
	const [passwordValid, setPasswordValid] = useState<boolean>(true);

	const buttonDisabled = !(password && email && passwordValid && emailValid);

	return (
		<Form>
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
			<Button disabled={buttonDisabled} fluid positive>
				Sign up
			</Button>
			<Divider horizontal>Or</Divider>
			<Button>
				<Icon name="google" />
				Sign up with Google
			</Button>
		</Form>
	);
};

export default SignUpForm;
