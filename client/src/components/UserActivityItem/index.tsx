import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

interface Props {
	item: WebApi.Entities.Projects | WebApi.Entities.UserProfile | any;
}

const UserActivityItem: React.FC<Props> = (props: Props) => {
	const { item } = props;
	const secondaryContent = item.category ? `${item.category} project` : item.jobTitle;
	const abbr = item.name ? item.name[0] : item.firstName[0] + item.lastName[0];

	return (
		<div className={styles.activityItem}>
			<div className={styles.avatar}>{abbr && <p className={styles.avatarTitle}>{abbr}</p>}</div>
			<div className={styles.block}>
				<Link to={`${item.firstName ? item.id : `/project/${item.id}/issues`}`}>
					<p className={styles.content}>{item.name ? item.name : item.firstName + ' ' + item.lastName}</p>
				</Link>
				<p className={styles.contentSecondary}>{secondaryContent}</p>
			</div>
		</div>
	);
};

export default UserActivityItem;
