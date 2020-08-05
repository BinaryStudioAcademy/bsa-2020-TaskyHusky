import React, { useState } from 'react';
import { FormInput, Icon, Popup } from 'semantic-ui-react';

interface Props {
	onChange: (text: string) => void;
	onChangeValid: (isValid: boolean) => void;
}

const PasswordInput: React.FC<Props> = ({ onChange, onChangeValid }) => {
	const [shown, setShown] = useState<boolean>(false);
	const [password, setPassword] = useState<string>('');
	const [valid, setValid] = useState<boolean>(true);

	const eyeIconName = shown ? 'eye' : 'eye slash';
	const inputType = shown ? 'text' : 'password';

	const toggleShown = () => setShown(!shown);

	return (
		<Popup
			open={!valid}
			on={[]}
			content="Password must be at least 6 characters long."
			position="bottom center"
			pinned
			trigger={
				<FormInput
					icon={<Icon name={eyeIconName} link onClick={toggleShown} />}
					placeholder="Password"
					type={inputType}
					onChange={(event, data: { value: string }) => {
						setPassword(data.value);
						onChange(data.value);
						setValid(true);
					}}
					onBlur={() => {
						setValid(Boolean(password) && password.length >= 6);
						onChangeValid(Boolean(password) && password.length >= 6);
					}}
					error={!valid}
				/>
			}
		/>
	);
};

export default PasswordInput;
