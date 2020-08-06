import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import * as actions from 'containers/ProfilePage/logiс/actions';
import { UserState } from 'containers/ProfilePage/logiс/state';

const ContentInput = ({
	contentData: { text, defaultContent, name },
	isCurrentUser,
}: {
	contentData: { text: string; defaultContent: boolean; name: string };
	isCurrentUser: boolean;
}) => {
	const initialText = defaultContent ? '' : text;
	const [textData, setTextData] = useState(initialText);
	const dispatch = useDispatch();

	const handleChange = (event: any) => {
		setTextData((event.target as HTMLInputElement).value);
	};
	const updateUserField = () => {
		if ((defaultContent && textData !== text) || !defaultContent) {
			dispatch(actions.requestUpdateUser({ userData: { [name]: textData } } as Partial<UserState>));
		}
	};

	return (
		<input
			className={`${styles.inputView} ${defaultContent ? styles.defaultContent : styles.content}`}
			type="text"
			name={name}
			value={textData}
			placeholder={text}
			onChange={handleChange}
			onBlur={updateUserField}
			disabled={isCurrentUser ? false : true}
		/>
	);
};

export default ContentInput;
