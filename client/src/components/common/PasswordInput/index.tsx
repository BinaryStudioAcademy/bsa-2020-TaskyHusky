import React, { useState } from 'react';
import { FormInput, Icon } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import styles from 'containers/LoginPage/styles.module.scss';
interface Props {
	onChange: (text: string) => void;
	onChangeValid?: (isValid: boolean) => void;
}

const PasswordInput: React.FC<Props> = ({ onChange, onChangeValid }) => {
	const [shown, setShown] = useState<boolean>(false);
	const [password, setPassword] = useState<string>('');
	const [valid, setValid] = useState<boolean>(true);
	const { t } = useTranslation();

	const eyeIconName = shown ? 'eye' : 'eye slash';
	const inputType = shown ? 'text' : 'password';

	const toggleShown = () => setShown(!shown);

	return (
		<FormInput
			icon={<Icon name={eyeIconName} link onClick={toggleShown} />}
			className={styles.inputField}
			placeholder={t('password')}
			type={inputType}
			onChange={(event, data: { value: string }) => {
				setPassword(data.value);
				onChange(data.value);
				setValid(true);
			}}
			onBlur={() => {
				setValid(Boolean(password) && password.length >= 6);

				if (onChangeValid) {
					onChangeValid(Boolean(password) && password.length >= 6);
				}
			}}
			error={!valid}
		/>
	);
};

export default PasswordInput;
