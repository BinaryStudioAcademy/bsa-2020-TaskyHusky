import React, { useState } from 'react';
import { Dropdown, Checkbox, DropdownItemProps, Button, Icon } from 'semantic-ui-react';
import styles from 'containers/Header/styles.module.scss';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import UserNotification from 'components/common/UserNotification';
import moment from 'moment';
import * as actions from './logic/actions';
import { useIO } from 'hooks/useIO';
import pushNotificationManager from 'config/push.config';
import NotificationsCount from 'components/common/NotificationsCount';

const NotificationsMenu: React.FC = () => {
	const [canShowAllNotifications, setCanShowAllNotifications] = useState<boolean>(false);
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const notifications = useSelector((state: RootState) => state.notifications.notifications);
	const user = useSelector((state: RootState) => state.auth.user);
	const { t } = useTranslation();
	const dispatch = useDispatch();

	useIO(WebApi.IO.Types.Notification, (io) => {
		io.on(WebApi.IO.NotificationActions.CreateNotification, (newNotification: WebApi.Result.NotificationResult) => {
			pushNotificationManager.push({
				title: newNotification.title,
				message: newNotification.text,
				onClick: () => newNotification.link && window.location.replace(newNotification.link),
			});

			if (user && newNotification.user.id === user.id) {
				dispatch(actions.setNotifications({ notifications: [...notifications, newNotification] }));
			}
		});

		io.on(WebApi.IO.NotificationActions.ViewNotification, (id: string) => {
			const newNotifications = [...notifications];
			const index = newNotifications.findIndex((notif) => notif.id === id);

			if (index > -1) {
				newNotifications[index].isViewed = true;
				dispatch(actions.setNotifications({ notifications: newNotifications }));
			}
		});

		io.on(WebApi.IO.NotificationActions.UnviewNotification, (id: string) => {
			const newNotifications = [...notifications];
			const index = newNotifications.findIndex((notif) => notif.id === id);

			if (index > -1) {
				newNotifications[index].isViewed = false;
				dispatch(actions.setNotifications({ notifications: newNotifications }));
			}
		});

		io.on(WebApi.IO.NotificationActions.ViewAllNotifications, (userId: string) => {
			if (user && user.id === userId) {
				const newNotifications = [...notifications].map((notif) => ({ ...notif, isViewed: true }));
				dispatch(actions.setNotifications({ notifications: newNotifications }));
			}
		});
	});

	const unviewedCount = notifications.filter((notif) => !notif.isViewed).length;

	const displayNotifications = notifications.filter((notif) =>
		canShowAllNotifications ? moment(notif.createdAt).isAfter(moment().subtract(10, 'days')) : !notif.isViewed,
	);

	const isThereUnread = notifications.some((notif) => !notif.isViewed);

	const ClosingItem: React.FC<DropdownItemProps> = (props) => {
		return (
			<Dropdown.Item
				{...props}
				onClick={(event, data) => {
					if (props.onClick) {
						props.onClick(event, data);
					}
					setIsOpened(false);
				}}
			>
				{props.children}
			</Dropdown.Item>
		);
	};

	document.body.onclick = () => setIsOpened(false);

	const viewAll = () => {
		dispatch(actions.viewAllNotifications());
	};

	return (
		<Dropdown
			icon={
				<NotificationsCount count={unviewedCount}>
					<Icon name="bell outline" />
				</NotificationsCount>
			}
			className={styles.circularIcon}
			direction="left"
			onOpen={() => setIsOpened(true)}
			open={isOpened}
		>
			<Dropdown.Menu className={styles.circularDropdownMenu}>
				<Dropdown.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					{t('notifications')}
					{isThereUnread ? (
						<Button className="primaryBtn" onClick={viewAll} style={{ paddingTop: 3, paddingBottom: 3 }}>
							{t('mark_all_as_read')}
						</Button>
					) : null}
				</Dropdown.Header>
				<div style={{ maxHeight: 700, overflowY: 'auto' }}>
					{displayNotifications.length ? (
						displayNotifications.map((notif) => (
							<div style={{ paddingLeft: 10, paddingRight: 10 }} key={notif.id}>
								<UserNotification notification={notif} />
							</div>
						))
					) : (
						<ClosingItem>{t('no')}</ClosingItem>
					)}
				</div>
				<Dropdown.Item>
					<Checkbox
						toggle
						onChange={(event, data) => {
							setCanShowAllNotifications(Boolean(data.checked));
							setIsOpened(true);
						}}
						label={t('show_notifs_during_last_10_days')}
					/>
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default NotificationsMenu;
