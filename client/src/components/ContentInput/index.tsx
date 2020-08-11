import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

interface Props {
	text: string;
	name: string;
	placeholder: string;
	title?: string;
	isCurrentUser: boolean;
}

const ContentInput: React.FC<Props> = (props: Props) => {
	const { text, name, placeholder, title, isCurrentUser } = props;

	const [textData, setTextData] = useState(text);

	const handleChange = (event: any) => {
		setTextData((event.target as HTMLInputElement).value);
	};
	const updateUserField = () => {
		//dispatch your action here
	};

	useEffect(() => {
		setTextData(text);
	}, [text]);

	return (
		<>
			{title && <label className={styles.label}>{title}</label>}
			<input
				className={styles.inputView}
				type="text"
				name={name}
				value={textData}
				placeholder={placeholder}
				onChange={handleChange}
				onBlur={updateUserField}
				disabled={isCurrentUser ? false : true}
			/>
		</>
	);
};

export default ContentInput;
