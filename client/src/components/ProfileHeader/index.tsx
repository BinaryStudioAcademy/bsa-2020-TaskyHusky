import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface Props {
	isCurrentUser: boolean;
}
const ProfileHeader = (props: Props) => {
	const { isCurrentUser } = props;
	const { t } = useTranslation();
	return (
		<div className={styles.header}>
			<h1 className={styles.content}>{isCurrentUser ? t('my_profile') : t('profile')}</h1>
		</div>
	);
};

export default ProfileHeader;
