import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import { useTranslation } from 'react-i18next';
import { RootState } from 'typings/rootState';
import styles from './styles.module.scss';
import { Header, Button, Checkbox, Select, Form, Popup } from 'semantic-ui-react';
import { requestUpdateUser } from 'containers/ProfilePage/logiс/actions';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';
import SubmitedInput from 'components/SubmitedInput';

interface Props {
	updateUser: (changedUser: Partial<UserProfileState>) => void;
}
const EmailManager: React.FC<Props> = (props: Props) => {
	const { updateUser } = props;
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const email = useSelector((state: RootState) => state.user.email);
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
		{ key: 'send', value: true, text: 'Send me email notifications' },
		{ key: 'notSend', value: false, text: 'Do not send me email notifications' },
	];

	return (
		<section className={styles.container}>
			<Header as="h3">{t('email')}</Header>
			<Header as="h4">{t('change_email')}</Header>
			<p>
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
			<Header as="h4">{t('email_notif')}</Header>
			<p>{t('content_notif')}</p>
			<Select placeholder={t('choose_option_notif')} className={styles.select} options={notifaictionsOptions} />
			<p>{t('get_email_when')}</p>
			<Checkbox className={styles.checkbox} label={t('watching_issue')} />
			<Checkbox className={styles.checkbox} label={t('you_reporter')} />
			<Checkbox className={styles.checkbox} label={t('you_asignee')} />
			<Checkbox className={styles.checkbox} label={t('someone_mention')} />
			<Checkbox className={styles.checkbox} label={t('make_changes')} />
		</section>
	);
};

export default EmailManager;
