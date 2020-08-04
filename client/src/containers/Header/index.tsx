import React, { useState } from 'react';
import { Menu, Image, Input, Button } from 'semantic-ui-react';
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

				<Menu.Item
					name="projects"
					active={activeItem === 'projects'}
					onClick={() => toggleActiveItem('projects')}
				>
					Projects
				</Menu.Item>

				<Menu.Item name="filters" active={activeItem === 'filters'} onClick={() => toggleActiveItem('filters')}>
					Filters
				</Menu.Item>

				<Menu.Item
					name="dashboards"
					active={activeItem === 'dashboards'}
					onClick={() => toggleActiveItem('dashboards')}
				>
					Dashboards
				</Menu.Item>

				<Menu.Item name="people" active={activeItem === 'people'} onClick={() => toggleActiveItem('people')}>
					People
				</Menu.Item>

				<Menu.Item name="create" active={activeItem === 'create'} onClick={() => {}}>
					<Button primary>Create</Button>
				</Menu.Item>

				<Menu.Item position="right">
					<Input className="icon" icon="search" placeholder="Search..." />
					<Button circular icon="bell" className={styles.circularIcon} />
					<Button circular icon="question circle" className={styles.circularIcon} />
					<Button circular icon="setting" className={styles.circularIcon} />
					<Button circular icon="user" className={styles.circularIcon} />
				</Menu.Item>
			</Menu>

			{renderDashboards}
		</>
	);
};

export default HeaderMenu;
