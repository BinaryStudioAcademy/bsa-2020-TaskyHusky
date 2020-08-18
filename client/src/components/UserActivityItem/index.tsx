import React from 'react';
import styles from './styles.module.scss';

interface Props {
	icon?: string;
	item: {
		name: string;
		category: string;
	};
}

const UserActivityItem: React.FC<Props> = (props: Props) => {
	const {
		icon,
		item: { name, category },
	} = props;
	return (
		<div className={styles.activityItem}>
			{icon ? (
				<img src={icon} alt="icon" className={styles.icon} />
			) : (
				<div className={styles.avatar}>
					<p className={styles.avatarTitle}>{name[0]}</p>
				</div>
			)}

			<div className={styles.block}>
				<p className={styles.content}>{name}</p>
				<p className={styles.contentSecondary}>{category} project</p>
			</div>
		</div>
	);
};

export default UserActivityItem;
