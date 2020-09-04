import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { RootState } from 'typings/rootState';
import { sendEmailResetLink } from 'containers/ProfilePage/logiс/actions';
import SubmitEmail from 'components/SubmitEmail';

const EmailManager = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const email = useSelector((state: RootState) => state.user.email);

	const sendEmail = (emailData: string) => {
		dispatch(sendEmailResetLink({ email: emailData }));
	};

	return (
		<section className={styles.container}>
			<div className={styles.card}>
				<h3 className={styles.header}>{t('change_email')}</h3>
				<p className={styles.textData}>
					{t('current_email')}
					{email}
				</p>
				<SubmitEmail sendEmail={sendEmail} email={email} newEmail={false} title={t('new_email_title')} />
			</div>
		</section>
	);
};

export default EmailManager;
