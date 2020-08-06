import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import * as actions from 'containers/ProfilePage/logiс/actions';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';

interface propsContentInput {
	contentData: { text: string; defaultContent: boolean; name: string };
	isCurrentUser: boolean;
}

const ContentInput = ({ contentData: { text, defaultContent, name }, isCurrentUser }: propsContentInput) => {
	const initialText = defaultContent ? '' : text;
	const [textData, setTextData] = useState(initialText);
	const dispatch = useDispatch();

	const handleChange = (event: any) => {
		setTextData((event.target as HTMLInputElement).value);
	};
	const updateUserField = () => {
		if ((defaultContent && textData !== text) || !defaultContent) {
			dispatch(actions.requestUpdateUser({ userData: { [name]: textData } } as Partial<UserProfileState>));
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
