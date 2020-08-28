import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import SubmitedInput from 'components/SubmitedInput';
import CustomValidator from 'helpers/validation.helper';
import styles from 'components/EmailManager/styles.module.scss';

interface Props {
	email: string;
	sendEmail: (event: any) => void;
	newEmail: boolean;
	title: string;
}

const SubmitEmail: React.FC<Props> = (props: Props) => {
	const { t } = useTranslation();
	const { email, sendEmail, newEmail, title } = props;
	const [emailData, setEmailData] = useState<string>('');
	const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [isSubmit, setIsSumbit] = useState<boolean>(false);

	const handleChange = (event: any) => {
		setEmailData((event.target as HTMLInputElement).value);
	};

	const onBlur = () => {
		const customValidator = new CustomValidator(emailData);
		const isntValid = customValidator.checkMinLength(6).checkMaxLength(321).checkEmailField().validate();
		if (isntValid) {
			setErrorMessage(isntValid);
			setIsEmailValid(false);
			setIsSumbit(false);
		} else {
			setIsEmailValid(true);
			setIsSumbit(newEmail ? emailData.trim() === email : emailData.trim() !== email);
		}
	};

	const updateEmail = () => {
		sendEmail(emailData);
		setIsSumbit(false);
		setEmailData('');
	};

	return (
		<Form onSubmit={updateEmail}>
			<SubmitedInput
				text={emailData}
				propKey="email"
				title={title}
				placeholder={t('email_placeholder')}
				type="text"
				handleChange={handleChange}
				isValid={isEmailValid}
				onBlur={onBlur}
				errorText={errorMessage}
			/>
			{isSubmit && <p className={`${styles.textData} ${styles.addText}`}>{t('send_confirm_link')}</p>}
			<Button type="submit" className={styles.submitButton} disabled={!isSubmit}>
				{t('save_changes')}
			</Button>
		</Form>
	);
};

export default SubmitEmail;
