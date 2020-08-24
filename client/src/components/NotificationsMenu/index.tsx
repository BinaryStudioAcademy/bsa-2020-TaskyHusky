import React, { useState } from 'react';
import { Dropdown, Checkbox, DropdownItemProps } from 'semantic-ui-react';
import styles from 'containers/Header/styles.module.scss';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import UserNotification from 'components/common/UserNotification';
import moment from 'moment';

const NotificationsMenu: React.FC = () => {
	const [canShowAllNotifications, setCanShowAllNotifications] = useState<boolean>(false);
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const notifications = useSelector((state: RootState) => state.notifications.notifications);
	const { t } = useTranslation();

	const displayNotifications = notifications.filter((notif) =>
		canShowAllNotifications ? moment(notif.createdAt).isAfter(moment().subtract(10, 'days')) : !notif.isViewed,
	);

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

	return (
		<Dropdown
			icon="bell outline"
			className={styles.circularIcon}
			direction="left"
			onOpen={() => setIsOpened(true)}
			open={isOpened}
		>
			<Dropdown.Menu className={styles.circularDropdownMenu}>
				<Dropdown.Header>{t('notifications')}</Dropdown.Header>
				<Dropdown.Item>
					<Checkbox
						toggle
						onChange={(event, data) => {
							setCanShowAllNotifications(Boolean(data.checked));
							setIsOpened(true);
						}}
						label="Show all notifications during last 10 days"
					/>
				</Dropdown.Item>
				{displayNotifications.length ? (
					notifications.map((notif) => (
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
