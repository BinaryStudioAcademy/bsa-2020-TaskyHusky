import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import styles from 'styles/headerDropDown.module.scss';

export const FiltersMenu = () => {
	return (
		<Dropdown text="Dashboards" className="link item">
			<Dropdown.Menu className={styles.dropDownMenu}>
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
	);
};

export default FiltersMenu;
