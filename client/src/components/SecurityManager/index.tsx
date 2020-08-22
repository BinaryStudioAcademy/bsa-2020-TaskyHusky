import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { requestChangePassword } from 'containers/ProfilePage/logiс/actions';
import { Button, Form } from 'semantic-ui-react';
import SubmitedInput from 'components/SubmitedInput';
import PasswordCheck from 'components/PasswordCheck';
import CustomValidator from 'helpers/validation.helper';

const SecurityManager = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const acceptLength = 6;
	const [passwords, setPasswords] = useState({
		oldPassword: '',
		newPassword: '',
		repeatedPassword: '',
	});
	const [isRepeatedPassValid, setIsRepeatedPassValid] = useState<boolean>(true);
	const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [isPasswordSecure, setIsPasswordSecure] = useState<boolean>(false);
	const [isSubmit, setIsSubmit] = useState<boolean>(false);
	const handleChange = (event: any) => {
		if (isRepeatedPassValid && isPasswordValid && passwords.oldPassword) {
			setIsSubmit(true);
		}
		setPasswords({
			...passwords,
			[(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
		});
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

	const onBlurRepeated = () => {
		setIsRepeatedPassValid(
			!!passwords.newPassword &&
				!!passwords.repeatedPassword &&
				passwords.newPassword === passwords.repeatedPassword,
		);
	};
	const onSubmit = () => {
		if (isPasswordValid && isRepeatedPassValid) {
			const { oldPassword, newPassword } = passwords;
			dispatch(requestChangePassword({ oldPassword, newPassword }));
			setPasswords({ ...passwords, oldPassword: '', newPassword: '', repeatedPassword: '' });
			console.log(isPasswordSecure);
		}
	};
	return (
		<section className={styles.container}>
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
						onBlur={onBlurRepeated}
						errorText={t('pass_error_equal')}
					/>
					<Button className={styles.submitButton} type="submit" disabled={isSubmit ? false : true}>
						{t('save_changes')}
					</Button>
				</Form>
			</div>
		</section>
	);
};

export default SecurityManager;
