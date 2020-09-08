import React from 'react';
import styles from './styles.module.scss';

interface Props {
	count: number;
	children: JSX.Element;
}

const NotificationsCount: React.FC<Props> = ({ count, children }) => {
	const renderIndicator = count > 0 ? <div className={styles.counter}>{count}</div> : '';

	return (
		<div className={styles.notificationsIcon}>
			<div>{children}</div>
			{renderIndicator}
		</div>
	);
};

export default NotificationsCount;
