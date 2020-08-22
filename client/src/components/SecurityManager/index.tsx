import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { requestChangePassword } from 'containers/ProfilePage/logiс/actions';
import { Button, Form } from 'semantic-ui-react';
import SubmitedInput from 'components/SubmitedInput';
import PasswordCheck from 'components/PasswordCheck';
import CustomValidator from 'helpers/validation.helper';
import ConfirmPassModal from 'components/ConfirmPassModal';

const SecurityManager = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const acceptLength = 6;
	const [passwords, setPasswords] = useState({
		oldPassword: '',
		newPassword: '',
		repeatedPassword: '',
	});

	const [isRepeatedPassValid, setIsRepeatedPassValid] = useState<boolean>(false);
	const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [isPasswordSecure, setIsPasswordSecure] = useState<boolean>(false);
	const [isFormSubmited, setIsFormSubmited] = useState<boolean>(false);

	const isSubmitPossible =
		isRepeatedPassValid &&
		isPasswordValid &&
		passwords.oldPassword &&
		passwords.repeatedPassword &&
		passwords.newPassword;

	const handleChange = (event: any) => {
		setPasswords({
			...passwords,
			[(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
		});
		if ((event.target as HTMLInputElement).name === 'repeatedPassword') {
			setIsRepeatedPassValid(passwords.newPassword === (event.target as HTMLInputElement).value);
		} else {
			setIsRepeatedPassValid(passwords.newPassword === passwords.repeatedPassword);
		}
	};

	const checkPassSecurity = (isSecure: boolean) => {
		setIsPasswordSecure(isSecure);
	};

	const onBlurPass = () => {
		const customValidator = new CustomValidator(passwords.newPassword);
		const isntValid = customValidator
			.checkMinLength(acceptLength)
			.checkMaxLength(128)
			.checkPasswordField()
			.validate();
		if (isntValid) {
			setErrorMessage(isntValid);
			setIsPasswordValid(false);
		} else {
			setIsPasswordValid(true);
		}
	};

	const updatePassword = () => {
		setIsFormSubmited(false);
		const { oldPassword, newPassword } = passwords;
		dispatch(requestChangePassword({ oldPassword, newPassword }));
		setPasswords({ ...passwords, oldPassword: '', newPassword: '', repeatedPassword: '' });
		setIsRepeatedPassValid(false);
	};

	const onSubmit = () => {
		if (isSubmitPossible) {
			setIsFormSubmited(true);
			if (isPasswordSecure) {
				updatePassword();
			}
		}
	};

	const onClose = () => {
		setIsFormSubmited(false);
	};

	return (
		<section className={styles.container}>
			{isFormSubmited && !isPasswordSecure && (
				<ConfirmPassModal updatePassword={updatePassword} onClose={onClose} />
			)}
			<h3 className={styles.header}>{t('security')}</h3>
			<div className={styles.card}>
				<h4 className={styles.card__header}>{t('change_pass')}</h4>
				<Form onSubmit={onSubmit}>
					<SubmitedInput
						text={passwords.oldPassword}
						propKey="oldPassword"
						title={t('current_pass')}
						placeholder={t('enter_old_pass')}
						type="password"
						handleChange={handleChange}
					/>
					<SubmitedInput
						text={passwords.newPassword}
						propKey="newPassword"
						title={t('new_pass')}
						placeholder={t('enter_new_pass')}
						type="password"
						handleChange={handleChange}
						isValid={isPasswordValid}
						onBlur={onBlurPass}
						errorText={errorMessage}
					/>
					<PasswordCheck
						pass={passwords.newPassword}
						acceptLength={acceptLength}
						checkPassSecurity={checkPassSecurity}
					/>
					<SubmitedInput
						text={passwords.repeatedPassword}
						propKey="repeatedPassword"
						title={t('repeat_pass')}
						placeholder={t('placeholder_pass')}
						type="password"
						handleChange={handleChange}
						isValid={isRepeatedPassValid}
						errorText={t('pass_error_equal')}
					/>
					<Button className={styles.submitButton} type="submit" disabled={isSubmitPossible ? false : true}>
						{t('save_changes')}
					</Button>
				</Form>
			</div>
		</section>
	);
};

export default SecurityManager;
