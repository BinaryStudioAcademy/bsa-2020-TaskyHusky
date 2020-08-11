import React, { ChangeEvent } from 'react';
import styles from './styles.module.scss';

interface Props {
	contentData: { text: string; name: string; placeholder: string; title: string; type: string };
	handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SubmitedInput: React.FC<Props> = (props: Props) => {
	const {
		contentData: { text, name, placeholder, title, type },
		handleChange,
	} = props;

	return (
		<>
			<label className={styles.label}>{title}</label>
			<input
				className={styles.inputView}
				type={type}
				name={name}
				value={text}
				placeholder={placeholder}
				onChange={(event) => handleChange(event)}
			/>
		</>
	);
};

export default SubmitedInput;
