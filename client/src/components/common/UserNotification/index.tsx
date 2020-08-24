import React from 'react';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import * as actions from 'components/NotificationsMenu/logic/actions';
import { Button } from 'semantic-ui-react';

interface Props {
	notification: WebApi.Entities.Notification;
	notifications: WebApi.Entities.Notification[];
}

const UserNotification: React.FC<Props> = ({ notification, notifications }) => {
	const { id, title, text, link, isViewed } = notification;
	const dispatch = useDispatch();

	const view = () => {
		dispatch(actions.viewNotification({ id }));

		const newNotifications = [...notifications];
		const index = newNotifications.findIndex((notif) => notif.id === id);
		newNotifications[index].isViewed = true;

		dispatch(actions.setNotifications({ notifications: newNotifications }));
	};

	const renderTitle = title ? <h3 style={{ marginBottom: 10 }}>{title}</h3> : null;

	const renderMarker = !isViewed ? (
		<Button onClick={view} secondary inverted compact size="tiny" style={{ marginTop: 10 }}>
			Mark notification as read
		</Button>
	) : null;

	return (
		<div className={styles.container}>
			{renderTitle}
			<div>
				{text}
				{link ? (
					<a target="_blank" rel="noopener noreferrer" href={link} style={{ marginLeft: 20 }}>
						See it!
					</a>
				) : (
					''
				)}
			</div>
			{renderMarker}
		</div>
	);
};

export default UserNotification;
