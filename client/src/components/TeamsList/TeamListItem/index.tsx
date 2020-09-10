import React, { ReactElement } from 'react';
import styles from 'components/PeopleList/PeopleListItem/style.module.scss';
import { useTranslation } from 'react-i18next';
import { defaultAvatarBg } from 'constants/defaultColors';

interface Props {
	team: WebApi.Entities.Team;
	handlerClick?: () => void;
}

const TeamListItem: React.FC<Props> = ({ team, handlerClick }): ReactElement => {
	const { color, name, users } = team;
	const { t } = useTranslation();

	return (
		<div onClick={() => handlerClick && handlerClick()} className={styles.card}>
			<div className={styles.header}>
				<div className={styles.avatarContainer} style={{ background: color ?? defaultAvatarBg }}>
					<p className={styles.avatarTitle}>{name ? name[0] : ''}</p>
				</div>
				<div className={styles.headerContent}>
					<p className={styles.name}>{name}</p>
					<p className={styles.title}>
						{users?.length ?? 0}
						{(users?.length ?? 0) > 1 ? ` ${t('members_lower')}` : ` ${t('member')}`}
					</p>
				</div>
			</div>
			<div className={styles.colorBlock} style={{ background: color ?? '#fece2f' }} />
		</div>
	);
};

export default React.memo(TeamListItem);
