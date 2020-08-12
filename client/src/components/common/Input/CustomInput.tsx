import { Popup } from 'semantic-ui-react';
import React, { ChangeEvent } from 'react';

import styles from './styles.module.scss';

interface Props {
	isValidErrorShown: boolean;
	isDataValid: boolean;
	setIsDataValid: (isNameValid: boolean) => void;
	data: string;
	setData: (name: string) => void;
	placeholder: string;
	popUpContent: string;
	validation: (data: string) => boolean;
}

const CustomInput = ({
	isValidErrorShown,
	isDataValid,
	setIsDataValid,
	data,
	setData,
	placeholder,
	popUpContent,
	validation,
}: Props) => {
	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const isValid = validation(value);
		setIsDataValid(isValid);
		setData(value);
	};

	return (
		<Popup
			className={isValidErrorShown && !isDataValid ? styles.error : ''}
			open={isValidErrorShown && !isDataValid}
			position="top center"
			content={popUpContent}
			trigger={
				<input
					placeholder={placeholder}
					onChange={onInputChange}
					value={data}
					className={isValidErrorShown && !isDataValid ? styles.error : ''}
				/>
			}
		/>
	);
};

export default CustomInput;
