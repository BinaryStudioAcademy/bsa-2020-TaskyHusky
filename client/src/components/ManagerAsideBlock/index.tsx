import React from 'react';
import { Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface Props {
	showManager: (modeToShow: string) => void;
}

const ManagerAsideBlock: React.FC<Props> = (props: Props) => {
	const { t } = useTranslation();
	const { showManager } = props;

	return (
		<div className={styles.container}>
			<Button className={`${styles.button} ${styles.profileBtn}`} onClick={() => showManager('profile')}>
				{t('profile')}
			</Button>
			<Button className={`${styles.button} ${styles.emailBtn}`} onClick={() => showManager('email')}>
				{t('email')}
			</Button>
			<Button className={`${styles.button} ${styles.securityBtn}`} onClick={() => showManager('security')}>
				{t('security')}
			</Button>
			<Button className={`${styles.button} ${styles.accountBtn}`} onClick={() => showManager('account')}>
				{t('acc_pref')}
			</Button>
			<Button className={styles.button} onClick={() => showManager('')}>
				{t('back')}
			</Button>
		</div>
	);
};

export default ManagerAsideBlock;
