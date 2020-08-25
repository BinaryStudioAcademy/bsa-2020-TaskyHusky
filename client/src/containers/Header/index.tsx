import React, { useEffect, useState } from 'react';
import { Menu, Image, Dropdown, Button, Icon } from 'semantic-ui-react';
import logo from 'assets/logo192.png'; // TODO: replace with logo once it is ready
import styles from './styles.module.scss';
import { Link, Redirect } from 'react-router-dom';
import ProjectsMenu from 'components/ProjectsMenu';
import FiltersMenu from 'components/FiltersMenu';
import BoardsMenu from '../../components/BoardsMenu';
import DashboardsMenu from 'components/DashboardsMenu';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import { removeToken } from 'helpers/setToken.helper';
import * as actions from 'containers/LoginPage/logic/actions';
import * as boardAction from 'containers/Boards/logic/actions';
import { createBoard } from 'containers/Boards/logic/actionTypes';
import * as headerActions from './logic/actions';
import { User } from 'containers/LoginPage/logic/state';
import { useTranslation } from 'react-i18next';
import CreateIssueModal from 'containers/CreateIssueModal';
import { getUsername } from 'helpers/getUsername.helper';
import InviteNotification from '../../components/InviteNotification';
import UserAvatar from 'components/common/UserAvatar';

export const HeaderMenu = () => {
	const authStore = useSelector((rootStore: RootState) => rootStore.auth);
	const incomingInvites = useSelector((rootStore: RootState) => rootStore.header.invites);
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const user: User | null = authStore.user;

	const [activeItem, setActiveItem] = useState<string>('');
	const [redirectToDashboards, setRedirectToDashboards] = useState<boolean>(false);

	useEffect(() => {
		dispatch(headerActions.startLoading({ id: authStore.user?.id || '' }));
	}, [dispatch, authStore.user]);

	const logOutHandler = () => {
		dispatch(actions.logOutUserTrigger());
		removeToken();
	};
	const onCreateBoard = (board: createBoard) => {
		dispatch(boardAction.createBoard({ ...board }));
	};

	const toggleActiveItem: (name: string) => void = (name) => {
		setActiveItem(name);
	};

	const logoClickHandler = () => {
		setRedirectToDashboards(!redirectToDashboards);
	};

	const renderDashboards = redirectToDashboards ? <Redirect to="/dashboards" /> : null;

	return (
		<>
			<div className={`${styles.segmentWrapper} site-header`}>
				<Menu secondary className={styles.menuWrapper}>
					<Menu.Item onClick={logoClickHandler} className={`${styles.logoItem} site-logo`}>
						<Image src={logo} size="mini" alt={t('taskyhusky_logo')} />
						<span className={`${styles.logoText} site-logo-text`}>TaskyHusky</span>
					</Menu.Item>
					<Menu.Item
						as="span"
						name="your-work"
						active={activeItem === 'your-work'}
						onClick={() => toggleActiveItem('your-work')}
					>
						<Link to="#">
							<span className={styles.blackLink}>{t('your_work')}</span>
						</Link>
					</Menu.Item>
					<ProjectsMenu />
					<FiltersMenu />
					<DashboardsMenu />
					<BoardsMenu onCreateBoard={onCreateBoard} />
					<Menu.Item
						as="span"
						name="people"
						active={activeItem === 'people'}
						onClick={() => toggleActiveItem('people')}
					>
						<Link to="/people">
							<span className={styles.blackLink}>{t('people')}</span>
						</Link>
					</Menu.Item>
					<CreateIssueModal>
						<Menu.Item
							as={Button}
							className={styles.createMenuItem}
							name="create"
							active={activeItem === 'create'}
						>
							{t('create')}
							<Icon name="plus" style={{ marginLeft: 5, marginRight: 1 }} />
						</Menu.Item>
					</CreateIssueModal>
					<Menu.Item position="right" className={styles.rightMenu}>
						<Dropdown icon="users" className={styles.circularIcon} direction="left">
							<Dropdown.Menu>
								{incomingInvites.map((invite) => (
									<InviteNotification
										id={invite.id}
										name={`${invite.firstName} ${invite.lastName}`}
										avatar={invite.avatar || ''}
										key={invite.id}
										jobTitle={invite.jobTitle || ''}
									/>
								))}
							</Dropdown.Menu>
						</Dropdown>
						<Dropdown icon="bell outline" className={styles.circularIcon} direction="left">
							<Dropdown.Menu className={styles.circularDropdownMenu}>
								<Dropdown.Header>{t('notifications')}</Dropdown.Header>
								<Dropdown.Item>Notification item #1</Dropdown.Item>
								<Dropdown.Item>Notification item #2</Dropdown.Item>
								<Dropdown.Item>Notification item #3</Dropdown.Item>
								<Dropdown.Item>Notification item #4</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						{user ? (
							<div className={styles.userBlock}>
								<UserAvatar user={user} />
								<Dropdown
									text={getUsername(user as WebApi.Entities.UserProfile)}
									direction="left"
									id="userProfileMenuItem"
								>
									<Dropdown.Menu className={styles.circularDropdownMenu}>
										<Dropdown.Header>{`${user?.firstName} ${user?.lastName}`}</Dropdown.Header>
										<Link to={`/profile/${user?.id}`}>
											<Dropdown.Item>{t('profile')}</Dropdown.Item>
										</Link>
										<Link to={{ pathname: `/profile/${user?.id}`, search: '?param=profile' }}>
											<Dropdown.Item>{t('acc_settings')}</Dropdown.Item>
										</Link>
										<Dropdown.Divider />
										<Dropdown.Item onClick={logOutHandler}>{t('log_out')}</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
						) : (
							''
						)}
					</Menu.Item>
				</Menu>
			</div>
			{renderDashboards}
		</>
	);
};

export default HeaderMenu;
