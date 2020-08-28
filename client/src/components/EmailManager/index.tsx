import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { RootState } from 'typings/rootState';
import { Checkbox, Select } from 'semantic-ui-react';
import { sendEmailResetLink } from 'containers/ProfilePage/logiс/actions';
import SubmitEmail from 'components/SubmitEmail';

const EmailManager = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const email = useSelector((state: RootState) => state.user.email);

	const sendEmail = (emailData: string) => {
		dispatch(sendEmailResetLink({ email: emailData }));
	};

	const notifaictionsOptions = [
		{ key: 'send', value: true, text: t('send_email_notif') },
		{ key: 'notSend', value: false, text: t('dont_send_email_notif') },
	];

	return (
		<section className={styles.container}>
			<h3 className={styles.header}>{t('email')}</h3>
			<div className={styles.card}>
				<h4 className={styles.cardHeader}>{t('change_email')}</h4>
				<p className={styles.textData}>
					{t('current_email')}
					{email}
				</p>
				<SubmitEmail sendEmail={sendEmail} email={email} newEmail={false} />
				<h4 className={styles.cardHeader}>{t('email_notif')}</h4>
				<p className={styles.textData}>{t('content_notif')}</p>
				<Select
					placeholder={t('choose_option_notif')}
					className={styles.select}
					options={notifaictionsOptions}
				/>
				<p className={styles.textData}>{t('get_email_when')}</p>
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
