import React from 'react';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import * as actions from 'components/NotificationsMenu/logic/actions';
import { Button, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

interface Props {
	notification: WebApi.Result.NotificationResult;
}

const UserNotification: React.FC<Props> = ({ notification }) => {
	const { id, title, text, link, isViewed } = notification;
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const view = () => {
		dispatch(actions.viewNotification({ id }));
	};

	const unview = () => {
		dispatch(actions.unviewNotification({ id }));
	};

	const renderTitle = title ? <h3 style={{ marginBottom: 10 }}>{title}</h3> : null;

	const renderButton = !isViewed ? (
		<Button
			onClick={view}
			size="mini"
			icon={<Icon name="close" style={{ color: '#fece2f' }} />}
			title={t('mark_notif_as_read')}
			style={{ backgroundColor: 'black', paddingTop: 0, paddingBottom: 0, height: 20 }}
		/>
	) : (
		<Button
			onClick={unview}
			icon="eye slash"
			title={t('mark_notif_as_unread')}
			basic
			size="mini"
			style={{ paddingTop: 0, paddingBottom: 0, height: 20 }}
		/>
	);

	return (
		<div className={styles.container}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div style={{ display: 'flex' }}>
					{renderTitle}
					<div style={{ marginLeft: 10, position: 'relative', top: 5 }}>
						{moment(notification.createdAt).fromNow()}
					</div>
				</div>
				{renderButton}
			</div>
			<div style={{ width: '100%', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
				{link ? (
					<a href={link} target="_blank" rel="noopener noreferrer">
						{text}
					</a>
				) : (
					text
				)}
			</div>
		</div>
	);
};

export default UserNotification;
