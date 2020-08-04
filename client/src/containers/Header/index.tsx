import React, { useState } from 'react';
import { Menu, Image, Input, Button, Dropdown, Icon } from 'semantic-ui-react';
import logo from 'assets/logo192.png'; // TODO: replace with logo once it is ready
import styles from './styles.module.scss';
import { Redirect } from 'react-router-dom';

export const HeaderMenu = () => {
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
			<Menu stackable fixed="top">
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

				<Dropdown text="Projects" className="link item">
					<Dropdown.Menu>
						<Dropdown.Header>Recent</Dropdown.Header>
						<Dropdown.Item>
							<Icon name="folder open" />
							Project #1
						</Dropdown.Item>
						<Dropdown.Item>
							<Icon name="folder open" />
							Project #1
						</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item>View all projects</Dropdown.Item>
						<Dropdown.Item>Create project</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>

				<Dropdown text="Filters" className="link item">
					<Dropdown.Menu>
						<Dropdown.Header>Recent</Dropdown.Header>
						<Dropdown.Item>
							<Icon name="filter" />
							Filter #1
						</Dropdown.Item>
						<Dropdown.Item>
							<Icon name="filter" />
							Filter #1
						</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item>View all filters</Dropdown.Item>
						<Dropdown.Item>Advanced issue search</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>

				<Dropdown text="Dashboards" className="link item">
					<Dropdown.Menu>
						<Dropdown.Header>Recent</Dropdown.Header>
						<Dropdown.Item>
							<Icon name="flipboard" />
							Dashboard
						</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item>View all dashboards</Dropdown.Item>
						<Dropdown.Item>Create dashboard</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>

				<Menu.Item name="people" active={activeItem === 'people'} onClick={() => toggleActiveItem('people')}>
					People
				</Menu.Item>

				<Menu.Item name="create" active={activeItem === 'create'} className={styles.createItem}>
					<Button primary>Create</Button>
				</Menu.Item>

				<Menu.Item position="right">
					<Input className="icon" icon="search" placeholder="Search..." />

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
					<Dropdown icon="user" className={styles.circularIcon} direction="left">
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

			{renderDashboards}
		</>
	);
};

export default HeaderMenu;
