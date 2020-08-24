import React from 'react';
import styles from './styles.module.scss';

interface Props {
	notification: WebApi.Entities.Notification;
}

interface LinkProps {
	children: JSX.Element;
}

const UserNotification: React.FC<Props> = ({ notification }) => {
	const { title, text, link, isViewed } = notification;

	const Link: React.FC<LinkProps> = ({ children }) => {
		if (link) {
			return (
				<a href={link} rel="noopener noreferrer" target="_blank" className={styles.link}>
					{children}
				</a>
			);
		}

		return children;
	};

	const renderTitle = title ? <h3 className={styles.header}>{title}</h3> : null;

	const renderMarker = !isViewed ? <div className={styles.unreadMarker} /> : null;

	return (
		<Link>
			<div className={styles.container}>
				{renderTitle}
				{text}
				{renderMarker}
			</div>
		</Link>
	);
};

export default UserNotification;
