import { Popup, PopupProps, Input } from 'semantic-ui-react';
import React, { ChangeEvent } from 'react';

import styles from './styles.module.scss';

interface Props {
	isValidErrorShown: boolean;
	isDataValid: boolean;
	setIsDataValid: (isNameValid: boolean) => void;
	data: string;
	setData: (name: string) => void;
	placeholder: string;
	popUpContent: string | JSX.Element;
	validation: (data: string) => boolean;
	popUpPosition?: PopupProps['position'];
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
	popUpPosition,
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
			position={Boolean(popUpPosition) ? popUpPosition : 'top center'}
			content={popUpContent}
			on={[]}
			wide="very"
			trigger={
				<Input
					placeholder={placeholder}
					onChange={onInputChange}
					value={data}
					error={isValidErrorShown && !isDataValid}
				/>
			}
		/>
	);
};

export default CustomInput;
