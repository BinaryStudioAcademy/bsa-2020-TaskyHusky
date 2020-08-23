import React from 'react';
import styles from './styles.module.scss';

interface Props {
	icon?: string;
	item: WebApi.Entities.Projects | WebApi.Entities.UserProfile | any;
}

const UserActivityItem: React.FC<Props> = (props: Props) => {
	const { icon, item } = props;

	const secondaryContent = item.category ? `${item.category} project` : item.jobTitle;
	const abbr = item.name ? item.name[0] : item.firstName[0] + item.lastName[0];

	return (
		<div className={styles.activityItem}>
			{icon ? (
				<img src={icon} alt="icon" className={styles.icon} />
			) : (
				<div className={styles.avatar}>{abbr && <p className={styles.avatarTitle}>{abbr}</p>}</div>
			)}

			<div className={styles.block}>
				<p className={styles.content}>{item.name ? item.name : item.firstName + ' ' + item.lastName}</p>
				<p className={styles.contentSecondary}>{secondaryContent}</p>
			</div>
		</div>
	);
};

export default UserActivityItem;
