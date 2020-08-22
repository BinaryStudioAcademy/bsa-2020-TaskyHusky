import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import teamIcon from 'icons/profile/teamIcon.svg';
import { Link } from 'react-router-dom';

interface Props {
	teams: any;
}

const ProfileTeamBlock: React.FC<Props> = (props: Props) => {
	const { t } = useTranslation();
	const { teams } = props;
	return (
		<div>
			<h3 className={styles.header}>{t('team')}</h3>
			{teams.map((item: any) => (
				<div key={item.id} className={styles.item}>
					<div className={styles.groupIcon}>
						<img src={teamIcon} alt="icon" />
					</div>
					<div className={styles.content}>
						<Link to={`/team/${item.id}`}>
							<span className={styles.contentPrimary}>{item.name}</span>
						</Link>
						{item.description && <span className={styles.contentSecondary}>{item.description}</span>}
					</div>
				</div>
			))}
		</div>
	);
};

export default ProfileTeamBlock;
