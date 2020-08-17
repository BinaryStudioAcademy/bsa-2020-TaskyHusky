import React, { useState } from 'react';
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
import { User } from 'containers/LoginPage/logic/state';
import { useTranslation } from 'react-i18next';
import CreateIssueModal from 'containers/CreateIssueModal';
import { getUsername } from 'helpers/getUsername.helper';
import { getInitials } from 'helpers/getInitials.helper';

export const HeaderMenu = () => {
	const authStore = useSelector((rootStore: RootState) => rootStore.auth);
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const user: User | null = authStore.user;

	const [activeItem, setActiveItem] = useState<string>('');
	const [redirectToDashboards, setRedirectToDashboards] = useState<boolean>(false);

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
						name="your-work"
						active={activeItem === 'your-work'}
						onClick={() => toggleActiveItem('your-work')}
					>
						<Link to="#">{t('your_work')}</Link>
					</Menu.Item>
					<ProjectsMenu />
					<FiltersMenu />
					<DashboardsMenu />
					<BoardsMenu onCreateBoard={onCreateBoard} />
					<Menu.Item
						name="people"
						active={activeItem === 'people'}
						onClick={() => toggleActiveItem('people')}
					>
						<Link to="/people"> {t('people')} </Link>
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
								{user.avatar ? (
									<Image src={user.avatar} className={styles.avatarImage} circular />
								) : (
									<div className={styles.avatar}>{getInitials(user)}</div>
								)}
								<Dropdown
									text={getUsername(user as WebApi.Entities.UserProfile)}
									direction="left"
									id="userProfileMenuItem"
								>
									<Dropdown.Menu className={styles.circularDropdownMenu}>
										<Dropdown.Header>{`${user?.firstName} ${user?.lastName}`}</Dropdown.Header>
										<Dropdown.Item>
											<Link to={`/profile/${user?.id}`}>{t('profile')}</Link>
										</Dropdown.Item>
										<Dropdown.Item>
											<Link to={`/profile/${user?.id}`}>{t('acc_settings')}</Link>
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
