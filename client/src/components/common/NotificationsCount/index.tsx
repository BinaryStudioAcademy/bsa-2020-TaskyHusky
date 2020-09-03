import React from 'react';
import styles from './styles.module.scss';

interface Props {
	count: number;
	children: JSX.Element;
	noWiggle?: boolean;
}

const NotificationsCount: React.FC<Props> = ({ count, children, noWiggle }) => {
	const unreadNotifs = count > 0;
	const wiggle = unreadNotifs && !noWiggle ? styles.animatedWiggle : '';

	const renderIndicator = unreadNotifs ? (
		<div className={`${styles.counter} ${styles.animatedGrow}`}>{count}</div>
	) : (
		''
	);

	return (
		<div className={styles.notificationsIcon}>
			<div className={wiggle}>{children}</div>
			{renderIndicator}
		</div>
	);
};

export default NotificationsCount;
