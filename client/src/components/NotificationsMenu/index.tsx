import React, { useState } from 'react';
import { Dropdown, Checkbox, DropdownItemProps, Button } from 'semantic-ui-react';
import styles from 'containers/Header/styles.module.scss';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import UserNotification from 'components/common/UserNotification';
import moment from 'moment';
import * as actions from './logic/actions';

const NotificationsMenu: React.FC = () => {
	const [canShowAllNotifications, setCanShowAllNotifications] = useState<boolean>(false);
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const notifications = useSelector((state: RootState) => state.notifications.notifications);
	const { t } = useTranslation();
	const dispatch = useDispatch();

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
		const newNotifications = [...notifications].map((notif) => ({ ...notif, isViewed: true }));
		dispatch(actions.setNotifications({ notifications: newNotifications }));
	};

	return (
		<Dropdown
			icon="bell outline"
			className={styles.circularIcon}
			direction="left"
			onOpen={() => setIsOpened(true)}
			open={isOpened}
		>
			<Dropdown.Menu className={styles.circularDropdownMenu}>
				<Dropdown.Header>
					{t('notifications')}
					{isThereUnread ? (
						<Button
							positive
							compact
							size="mini"
							style={{ color: 'white', marginLeft: 20 }}
							onClick={viewAll}
						>
							{t('mark_all_as_read')}
						</Button>
					) : null}
				</Dropdown.Header>
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
				{displayNotifications.length ? (
					displayNotifications.map((notif) => (
						<div style={{ paddingLeft: 10, paddingRight: 10 }} key={notif.id}>
							<UserNotification notification={notif} notifications={notifications} />
						</div>
					))
				) : (
					<ClosingItem>{t('no')}</ClosingItem>
				)}
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default NotificationsMenu;
