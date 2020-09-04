import React, { useEffect, useState } from 'react';
import { Menu, Image, Dropdown, Button, Icon } from 'semantic-ui-react';
import logo from 'assets/logo192.png';
import styles from './styles.module.scss';
import { Link, Redirect, useRouteMatch, RouteProps } from 'react-router-dom';
import ProjectsMenu from 'components/ProjectsMenu';
import FiltersMenu from 'components/FiltersMenu';
import BoardsMenu from '../../components/BoardsMenu';
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
import NotificationsMenu from 'components/NotificationsMenu';
import UserAvatar from 'components/common/UserAvatar';
import NotificationsCount from 'components/common/NotificationsCount';

export const HeaderMenu = () => {
	const authStore = useSelector((rootStore: RootState) => rootStore.auth);
	const incomingInvites = useSelector((rootStore: RootState) => rootStore.header.invites);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const match: RouteProps = useRouteMatch();

	const user: User | null = authStore.user;

	const [activeItem, setActiveItem] = useState<string>(match.path as string);
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
			<div className={`${styles.segmentWrapper} site-header site-header-wrapper`}>
				<Menu secondary className={styles.menuWrapper}>
					<Menu.Item onClick={logoClickHandler} className={`${styles.logoItem} site-logo`}>
						<Image src={logo} size="mini" alt={t('taskyhusky_logo')} />
						<span className={`${styles.logoText} site-logo-text`}>TaskyHusky</span>
					</Menu.Item>
					<Menu.Item
						className={styles.media_query}
						as={Link}
						to="/my-work"
						name="my-work"
						active={activeItem === '/my-work'}
						onClick={() => toggleActiveItem('/my-work')}
						children={<span className={styles.blackLink}>{t('your_work')}</span>}
					/>
					<ProjectsMenu />
					<FiltersMenu />
					<BoardsMenu onCreateBoard={onCreateBoard} />
					<Menu.Item
						className={styles.media_query}
						as={Link}
						name="people"
						active={activeItem === '/people'}
						onClick={() => toggleActiveItem('/people')}
						to="/people"
						children={<span className={styles.blackLink}>{t('people')}</span>}
					/>
					<CreateIssueModal>
						<Menu.Item
							as={Button}
							className={styles.createMenuItem}
							name="create"
							active={activeItem === 'create'}
						>
							{t('create')}
						</Menu.Item>
					</CreateIssueModal>
					<Menu.Item position="right" className={styles.rightMenu}>
						<Dropdown
							icon={
								<NotificationsCount noWiggle count={incomingInvites.length}>
									<Icon name="users" />
								</NotificationsCount>
							}
							className={styles.circularIcon}
							direction="left"
						>
							<Dropdown.Menu className={styles.circularDropdownMenu}>
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
						<NotificationsMenu />
						{user ? (
							<div className={styles.userBlock}>
								<UserAvatar user={user} />
								<Dropdown
									className={styles.userNameText}
									text={getUsername(user as WebApi.Entities.UserProfile)}
									direction="left"
									id="userProfileMenuItem"
								>
									<Dropdown.Menu className={styles.circularDropdownMenu}>
										<Dropdown.Header>{`${user?.firstName} ${user?.lastName}`}</Dropdown.Header>
										<Dropdown.Item as={Link} to={`/profile/${user?.id}`}>
											{t('profile')}
										</Dropdown.Item>
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
