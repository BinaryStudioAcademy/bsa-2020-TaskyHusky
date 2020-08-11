import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { requestUpdateUser } from 'containers/ProfilePage/logiс/actions';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';

interface Props {
	contentData: { text: string; name: string; placeholder: string; title?: string };
	isCurrentUser: boolean;
}

const ContentInput: React.FC<Props> = (props: Props) => {
	const {
		contentData: { text, name, placeholder, title },
		isCurrentUser,
	} = props;

	const [textData, setTextData] = useState(text);
	const dispatch = useDispatch();

	const handleChange = (event: any) => {
		setTextData((event.target as HTMLInputElement).value);
	};
	const updateUserField = () => {
		if (textData !== text) {
			dispatch(requestUpdateUser({ userData: { [name]: textData.trim() } } as Partial<UserProfileState>));
		}
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
