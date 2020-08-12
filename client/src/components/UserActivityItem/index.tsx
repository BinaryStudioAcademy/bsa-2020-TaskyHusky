import React from 'react';
import { Icon } from 'semantic-ui-react';
import styles from './styles.module.scss';

const UserActivityItem = (
	{ item }: { item: any }, //any will be replaced when activity model is got
) => (
	<div className={styles.activityItem}>
		<Icon name="bookmark" size="large" className={styles.activityItem__icon} />
		<div className={styles.activityItem__block}>
			<p className={styles.activityItem__content}>{item.name}</p>
			<p className={styles.activityItem__content__secondary}>{item.project} - You updates this on</p>
		</div>
	</div>
);

export default UserActivityItem;
