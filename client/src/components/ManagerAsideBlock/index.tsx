import React from 'react';
import { Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { ModeManager } from 'containers/ProfilePage';

interface Props {
	showManager: (modeToShow: ModeManager) => void;
	editMode: string;
}

const ManagerAsideBlock: React.FC<Props> = (props: Props) => {
	const { t } = useTranslation();
	const { showManager, editMode } = props;

	return (
		<div className={styles.container}>
			<Button
				className={`${styles.button} ${editMode === 'profile' && styles.active}`}
				onClick={() => showManager(ModeManager.profile)}
			>
				{t('profile')}
			</Button>
			<Button
				className={`${styles.button} ${editMode === ModeManager.email && styles.active}`}
				onClick={() => showManager(ModeManager.email)}
			>
				{t('email')}
			</Button>
			<Button
				className={`${styles.button} ${editMode === ModeManager.security && styles.active}`}
				onClick={() => showManager(ModeManager.security)}
			>
				{t('security')}
			</Button>
			<Button
				className={`${styles.button} ${editMode === ModeManager.account && styles.active}`}
				onClick={() => showManager(ModeManager.account)}
			>
				{t('acc_pref')}
			</Button>
			<Button className={`${styles.button} ${styles.primaryBtn}`} onClick={() => showManager(ModeManager.main)}>
				{t('back')}
			</Button>
		</div>
	);
};

export default ManagerAsideBlock;
