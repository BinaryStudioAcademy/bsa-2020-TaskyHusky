import React, { ChangeEvent, useState } from 'react';
import styles from './styles.module.scss';
import { FormInput, Popup, Icon } from 'semantic-ui-react';

interface Props {
	text: string;
	propKey: string;
	placeholder: string;
	title: string;
	type: string;
	isValid?: boolean;
	onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
	handleChange: (event: any) => void;
	errorText?: string;
}

const SubmitedInput: React.FC<Props> = (props: Props) => {
	const {
		text = '',
		propKey,
		placeholder,
		title,
		type,
		handleChange,
		isValid = true,
		onBlur = null,
		errorText = '',
	} = props;
	const [shown, setShown] = useState<boolean>(false);
	const [inputType, setInputType] = useState<string>(type);
	const eyeIconName = shown ? 'eye' : 'eye slash';
	const toggleShown = () => {
		setShown(!shown);
		if (!shown) {
			setInputType('text');
		} else {
			setInputType('password');
		}
	};
	return (
		<Popup
			className={styles.errorPopup}
			open={!isValid && Boolean(text) && Boolean(errorText)}
			content={errorText}
			on={[]}
			trigger={
				<div>
					<label className={styles.label}>{title}</label>
					<FormInput
						icon={type === 'password' ? <Icon name={eyeIconName} link onClick={toggleShown} /> : null}
						className={styles.inputView}
						type={inputType}
						name={propKey}
						value={text}
						placeholder={placeholder}
						onChange={(event) => handleChange(event)}
						error={isValid || !text ? false : true}
						onBlur={onBlur && ((event: ChangeEvent<HTMLInputElement>) => onBlur(event))}
					/>
				</div>
			}
		/>
	);
};

export default SubmitedInput;
