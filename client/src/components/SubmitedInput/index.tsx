import React, { ChangeEvent } from 'react';
import styles from './styles.module.scss';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';

interface Props {
	text: string;
	propKey: string;
	placeholder: string;
	title: string;
	type: string;
	handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SubmitedInput: React.FC<Props> = (props: Props) => {
	const { text, propKey, placeholder, title, type, handleChange } = props;

	return (
		<>
			<label className={styles.label}>{title}</label>
			<input
				className={styles.inputView}
				type={type}
				name={propKey}
				value={text}
				placeholder={placeholder}
				onChange={(event) => handleChange(event)}
			/>
		</>
	);
};

export default SubmitedInput;
