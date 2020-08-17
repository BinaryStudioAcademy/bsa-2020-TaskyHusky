import React from 'react';
import styles from './styles.module.scss';

interface Props {
	icon?: string;
	item: {
		name: string;
		project: string;
	};
}

const UserActivityItem: React.FC<Props> = (props: Props) => {
	const {
		icon,
		item: { name, project },
	} = props;
	return (
		<div className={styles.activityItem}>
			{icon ? (
				<img src={icon} alt="icon" className={styles.activityItem__icon} />
			) : (
				<div className={styles.avatar}>
					<p className={styles.avatarTitle}>{name[0]}</p>
				</div>
			)}

			<div className={styles.block}>
				<p className={styles.content}>{name}</p>
				<p className={styles.contentSecondary}>{project}</p>
			</div>
		</div>
	);
};

export default UserActivityItem;
