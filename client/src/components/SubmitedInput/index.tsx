import React, { ChangeEvent } from 'react';
import styles from './styles.module.scss';
import { Input } from 'semantic-ui-react';

interface Props {
	text: string;
	propKey: string;
	placeholder: string;
	title: string;
	type: string;
	isValid?: boolean;
	onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
	handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SubmitedInput: React.FC<Props> = (props: Props) => {
	const { text, propKey, placeholder, title, type, handleChange, isValid = true, onBlur = null } = props;

	return (
		<>
			<label className={styles.label}>{title}</label>
			<Input
				className={styles.inputView}
				type={type}
				name={propKey}
				value={text}
				placeholder={placeholder}
				onChange={(event) => handleChange(event)}
				error={isValid ? false : true}
				onBlur={onBlur && ((event: ChangeEvent<HTMLInputElement>) => onBlur(event))}
			/>
		</>
	);
};

export default SubmitedInput;
