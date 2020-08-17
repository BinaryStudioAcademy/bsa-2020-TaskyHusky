import React from 'react';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import mail from 'icons/profile/mail.svg';

interface Props {
	email: string;
}
const ProfileContacntBlock: React.FC<Props> = (props: Props) => {
	const { t } = useTranslation();
	const { email } = props;
	return (
		<>
			<h3 className={styles.header}>{t('contact')}</h3>
			{email && (
				<div className={`${styles.email} ${styles.neverPoint}`}>
					<img src={mail} alt="icon" className={styles.icon} />
					<p className={styles.textData}>{email}</p>
				</div>
			)}
		</>
	);
};

export default ProfileContacntBlock;
