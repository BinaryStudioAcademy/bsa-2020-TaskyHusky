import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import styles from 'styles/headerDropDown.module.scss';

export const ProjectsMenu = () => {
	return (
		<Dropdown text="Projects" className="link item">
			<Dropdown.Menu className={styles.dropDownMenu}>
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
	);
};

export default ProjectsMenu;
