import React from 'react';
import { Button } from 'semantic-ui-react';
import styles from './styles.module.scss';

interface Props {
	showManager: (modeToShow: string) => void;
}

const ManagerAsideBlock: React.FC<Props> = (props: Props) => {
	const { showManager } = props;

	return (
		<div className={styles.container}>
			<Button className={styles.button} onClick={() => showManager('profile')}>
				Profile
			</Button>
			<Button className={styles.button} onClick={() => showManager('email')}>
				Email
			</Button>
			<Button className={styles.button} onClick={() => showManager('security')}>
				Security
			</Button>
			<Button className={styles.button} onClick={() => showManager('account')}>
				Account preferences
			</Button>
			<Button className={styles.button} onClick={() => showManager('')}>
				Back
			</Button>
		</div>
	);
};

export default ManagerAsideBlock;
