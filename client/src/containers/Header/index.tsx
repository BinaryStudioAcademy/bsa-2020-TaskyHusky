import React, { useState } from 'react';
import { Menu, Image, Input, Dropdown, Button, Icon } from 'semantic-ui-react';
import logo from 'assets/logo192.png'; // TODO: replace with logo once it is ready
import styles from './styles.module.scss';
import { Redirect } from 'react-router-dom';
import ProjectsMenu from 'components/ProjectsMenu';
import FiltersMenu from 'components/FiltersMenu';
import DashboardsMenu from 'components/DashboardsMenu';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import { removeToken } from 'helpers/setToken.helper';
import * as actions from 'containers/LoginPage/logic/actions';
import { User } from 'containers/LoginPage/logic/state';
import { useTranslation } from 'react-i18next';
import CreateIssueModal from 'containers/CreateIssueModal';

export const HeaderMenu = () => {
	const authStore = useSelector((rootStore: RootState) => rootStore.auth);
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const user: User | null = authStore.user;

	const [searchValue, setSearchValue] = useState<string>('');
	const [activeItem, setActiveItem] = useState<string>('');
	const [redirectToDashboards, setRedirectToDashboards] = useState<boolean>(false);

	const logOutHandler = () => {
		dispatch(actions.logOutUserTrigger());
		removeToken();
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
						{t('your_work')}
					</Menu.Item>
					<ProjectsMenu />
					<FiltersMenu />
					<DashboardsMenu />
					<Menu.Item
						name="people"
						active={activeItem === 'people'}
						onClick={() => toggleActiveItem('people')}
					>
						{t('people')}
					</Menu.Item>
					<CreateIssueModal>
						<Menu.Item
							as={Button}
							className={styles.createMenuItem}
							name="create"
							active={activeItem === 'create'}
						>
							{t('create')}
							<Icon name="plus" style={{ marginLeft: 5, marginRight: -5 }} />
						</Menu.Item>
					</CreateIssueModal>
					<Menu.Item position="right" className={styles.rightMenu}>
						<Input
							className="icon"
							icon="search"
							placeholder={t('search')}
							value={searchValue}
							onChange={(event) => setSearchValue(event.target.value)}
						/>
						<Dropdown icon="bell" className={styles.circularIcon} direction="left">
							<Dropdown.Menu className={styles.circularDropdownMenu}>
								<Dropdown.Header>{t('notifications')}</Dropdown.Header>
								<Dropdown.Item>Notification item #1</Dropdown.Item>
								<Dropdown.Item>Notification item #2</Dropdown.Item>
								<Dropdown.Item>Notification item #3</Dropdown.Item>
								<Dropdown.Item>Notification item #4</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						<Dropdown icon="question circle" className={styles.circularIcon} direction="left">
							<Dropdown.Menu className={styles.circularDropdownMenu}>
								<Dropdown.Header>{t('help')}</Dropdown.Header>
								<Dropdown.Item>{t('docs')}</Dropdown.Item>
								<Dropdown.Item>{t('community')}</Dropdown.Item>
								<Dropdown.Item>{t('get_mobile')}</Dropdown.Item>
								<Dropdown.Item>{t('about_tasky')}</Dropdown.Item>
								<Dropdown.Header>{t('legal')}</Dropdown.Header>
								<Dropdown.Item>{t('term_of_use')}</Dropdown.Item>
								<Dropdown.Item>{t('privacy_policy')}</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						<Dropdown icon="setting" className={styles.circularIcon} direction="left">
							<Dropdown.Menu className={styles.circularDropdownMenu}>
								<Dropdown.Header>Header</Dropdown.Header>
								<Dropdown.Item>Settings item #1</Dropdown.Item>
								<Dropdown.Item>Settings item #1</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						<Dropdown icon="user" className={styles.circularIcon} direction="left" id="userProfileMenuItem">
							<Dropdown.Menu className={styles.circularDropdownMenu}>
								<Dropdown.Header>{`${user?.firstName} ${user?.lastName}`}</Dropdown.Header>
								<Dropdown.Item as="a" href={`/profile/${user?.id}`}>
									{t('profile')}
								</Dropdown.Item>
								<Dropdown.Item>{t('acc_settings')}</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item onClick={logOutHandler}>{t('log_out')}</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Menu.Item>
				</Menu>
			</div>
			{renderDashboards}
		</>
	);
};

export default HeaderMenu;
