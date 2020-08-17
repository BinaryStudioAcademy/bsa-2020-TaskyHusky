import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { Button, Checkbox, Select, Form, Popup } from 'semantic-ui-react';
import { requestUpdateUser } from 'containers/ProfilePage/logiс/actions';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';
import SubmitedInput from 'components/SubmitedInput';

interface Props {
	updateUser: (changedUser: Partial<UserProfileState>) => void;
	email: string;
}
const EmailManager: React.FC<Props> = (props: Props) => {
	const { updateUser, email } = props;
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [emailData, setEmailData] = useState('');
	const [isEmailValid, setIsEmailValid] = useState(true);
	const handleChange = (event: any) => {
		setEmailData((event.target as HTMLInputElement).value);
	};
	const onBlur = () => {
		setIsEmailValid(validator.isEmail(emailData));
	};
	const updateUserField = () => {
		if (emailData !== email && isEmailValid) {
			updateUser({ email: emailData.trim() });
			dispatch(requestUpdateUser({ email: emailData.trim() } as Partial<UserProfileState>));
		}
	};

	const notifaictionsOptions = [
		{ key: 'send', value: true, text: t('send_email_notif') },
		{ key: 'notSend', value: false, text: t('dont_send_email_notif') },
	];

	return (
		<section className={styles.container}>
			<h3 className={styles.header}>{t('email')}</h3>
			<div className={styles.card}>
				<h4 className={styles.card__header}>{t('change_email')}</h4>
				<p className={styles.card__textData}>
					{t('current_email')}
					{email}
				</p>
				<Form onSubmit={updateUserField}>
					<Popup
						className={styles.errorPopup}
						open={!isEmailValid}
						content={t('invalid_email')}
						on={[]}
						trigger={
							<SubmitedInput
								text={emailData}
								propKey="email"
								title={t('email_title')}
								placeholder={t('email_placeholder')}
								type="text"
								handleChange={handleChange}
								isValid={isEmailValid}
								onBlur={onBlur}
							/>
						}
					/>
					<Button type="submit" className={styles.submitButton}>
						{t('save_changes')}
					</Button>
				</Form>
				<h4 className={styles.card__header}>{t('email_notif')}</h4>
				<p className={styles.card__textData}>{t('content_notif')}</p>
				<Select
					placeholder={t('choose_option_notif')}
					className={styles.select}
					options={notifaictionsOptions}
				/>
				<p className={styles.card__textData}>{t('get_email_when')}</p>
				<Checkbox className={styles.checkbox} label={t('watching_issue')} />
				<Checkbox className={styles.checkbox} label={t('you_reporter')} />
				<Checkbox className={styles.checkbox} label={t('you_asignee')} />
				<Checkbox className={styles.checkbox} label={t('someone_mention')} />
				<Checkbox className={styles.checkbox} label={t('make_changes')} />
			</div>
		</section>
	);
};

export default EmailManager;
