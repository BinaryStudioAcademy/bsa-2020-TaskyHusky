import React, { useState } from 'react';
import { Menu, Image, Input, Segment, Dropdown, Icon } from 'semantic-ui-react';
import logo from 'assets/logo192.png'; // TODO: replace with logo once it is ready
import styles from './styles.module.scss';
import { Redirect } from 'react-router-dom';
import ProjectsMenu from 'components/ProjectsMenu';
import FiltersMenu from 'components/FiltersMenu';
import DashboardsMenu from 'components/DashboardsMenu';

export const HeaderMenu = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [activeItem, setActiveItem] = useState<string>('');
	const [redirectToDashboards, setRedirectToDashboards] = useState<boolean>(false);

	const toggleActiveItem: (name: string) => void = (name) => {
		setActiveItem(name);
	};

	const logoClickHandler = () => {
		setRedirectToDashboards(!redirectToDashboards);
	};

	const renderDashboards = redirectToDashboards ? <Redirect to="/dashboards" /> : null;

	return (
		<>
			<Segment className={styles.segmentWrapper}>
				<Menu secondary className={styles.menuWrapper}>
					<Menu.Item onClick={logoClickHandler} className={styles.logoItem}>
						<Image src={logo} size="mini" alt="Tusky-Husky Logo" />
					</Menu.Item>

					<Menu.Item
						name="your-work"
						active={activeItem === 'your-work'}
						onClick={() => toggleActiveItem('your-work')}
					>
						Your work
					</Menu.Item>

					<ProjectsMenu />

					<FiltersMenu />

					<DashboardsMenu />

					<Menu.Item
						name="people"
						active={activeItem === 'people'}
						onClick={() => toggleActiveItem('people')}
					>
						People
					</Menu.Item>

					<Menu.Item
						className={styles.createMenuItem}
						name="create"
						active={activeItem === 'create'}
						onClick={() => toggleActiveItem('create')}
					>
						Create
					</Menu.Item>

					<Menu.Item position="right" className={styles.rightMenu}>
						<Input
							className="icon"
							icon="search"
							placeholder="Search..."
							value={searchValue}
							onChange={(event) => setSearchValue(event.target.value)}
						/>

						<Dropdown icon="bell" className={styles.circularIcon} direction="left">
							<Dropdown.Menu className={styles.circularDropdownMenu}>
								<Dropdown.Header>Notifications</Dropdown.Header>
								<Dropdown.Item>Notification item #1</Dropdown.Item>
								<Dropdown.Item>Notification item #2</Dropdown.Item>
								<Dropdown.Item>Notification item #3</Dropdown.Item>
								<Dropdown.Item>Notification item #4</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						<Dropdown icon="question circle" className={styles.circularIcon} direction="left">
							<Dropdown.Menu className={styles.circularDropdownMenu}>
								<Dropdown.Header>Help</Dropdown.Header>
								<Dropdown.Item>Documentation</Dropdown.Item>
								<Dropdown.Item>Community</Dropdown.Item>
								<Dropdown.Item>Get Tasky-Husky mobile</Dropdown.Item>
								<Dropdown.Item>About Tasky-Husky</Dropdown.Item>
								<Dropdown.Header>Legal</Dropdown.Header>
								<Dropdown.Item>Term of use</Dropdown.Item>
								<Dropdown.Item>Privacy policy</Dropdown.Item>
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
								<Dropdown.Header>User Name</Dropdown.Header>
								<Dropdown.Item>Profile</Dropdown.Item>
								<Dropdown.Item>Account settings</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item>Log out</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Menu.Item>
				</Menu>
			</Segment>

			{renderDashboards}
		</>
	);
};

export default HeaderMenu;
