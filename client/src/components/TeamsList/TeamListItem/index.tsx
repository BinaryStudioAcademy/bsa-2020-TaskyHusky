import React, { ReactElement } from 'react';
import UserAvatar from 'components/common/UserAvatar';
import styles from 'components/PeopleList/PeopleListItem/style.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
	team: WebApi.Entities.Team;
	handlerClick?: () => void;
}

const TeamListItem: React.FC<Props> = ({ team, handlerClick }): ReactElement => {
	const { color, name, createdBy, users } = team;
	const { t } = useTranslation();

	return (
		<div onClick={() => handlerClick && handlerClick()} className={styles.card}>
			<div className={styles.header}>
				<div className={styles.avatarWrapper}>
					<UserAvatar user={createdBy} />
				</div>
				<div className={styles.headerContent}>
					<p className={styles.name}>{name}</p>
					<p className={styles.title}>
						{users?.length ?? 0}
						{users?.length ? ` ${t('member')}` : ` ${t('members_lower')}`}
					</p>
				</div>
			</div>
			<div className={styles.colorBlock} style={{ background: color }} />
		</div>
	);
};

export default React.memo(TeamListItem);
