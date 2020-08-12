import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
	email: string;
	isCurrentUser: boolean;
}
const ProfileContacntBlock: React.FC<Props> = (props: Props) => {
	const { t } = useTranslation();
	const { email, isCurrentUser } = props;
	return (
		<>
			<Header as="h3" className={styles.header}>
				{t('contact')}
			</Header>
			{email ? (
				<div className={`${styles.email} ${styles.neverPoint}`}>
					<Icon disabled name="envelope outline" size="large" />
					<p className={styles.infoBlock__content}>{email}</p>
				</div>
			) : isCurrentUser ? (
				<div className={styles.item}>
					<Icon disabled name="envelope outline" size="large" />
					<p>{t('your_location')}</p>
				</div>
			) : (
				''
			)}
		</>
	);
};

export default ProfileContacntBlock;
