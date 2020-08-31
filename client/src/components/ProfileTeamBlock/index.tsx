import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import teamIcon from 'icons/profile/teamIcon.svg';
import { Link } from 'react-router-dom';

interface Props {
	teams: Array<WebApi.Entities.Team>;
}

const ProfileTeamBlock: React.FC<Props> = (props: Props) => {
	const { t } = useTranslation();
	const { teams } = props;
	return (
		<div>
			<h3 className={styles.header}>{t('team')}</h3>
			{teams.map((item: WebApi.Entities.Team) => (
				<div key={item.id} className={styles.item}>
					<div className={styles.groupIcon} style={{ backgroundColor: item.color }}>
						<img src={teamIcon} alt="icon" />
					</div>
					<div className={styles.content}>
						<Link to={`/team/${item.id}`}>
							<span className={styles.contentPrimary}>{item.name}</span>
						</Link>
						<span className={styles.contentSecondary}>
							{item.users?.length} {item.users?.length === 1 ? 'member' : 'members'}
						</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default ProfileTeamBlock;
