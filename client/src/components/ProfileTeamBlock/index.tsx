import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import teamIcon from 'icons/profile/teamIcon.svg';

interface Props {
	mockData: any;
}

const ProfileTeamBlock: React.FC<Props> = (props: Props) => {
	const { t } = useTranslation();
	const { mockData } = props;
	return (
		<div>
			<h3 className={styles.header}>{t('team')}</h3>
			{mockData.teams.map((item: any) => (
				<div key={item.id} className={styles.item}>
					<div className={styles.groupIcon}>
						<img src={teamIcon} alt="icon" />
					</div>
					<div className={styles.content}>
						<span className={styles.content__primary}>{item.name}</span>
						<span className={styles.content__secondary}>
							{item.members}
							{item.members === 1 ? ' member' : ' members'}
						</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default ProfileTeamBlock;
