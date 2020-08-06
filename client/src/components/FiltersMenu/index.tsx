import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import styles from 'styles/headerDropDown.module.scss';

export const FiltersMenu = () => {
	return (
		<Dropdown text="Filters" className="link item">
			<Dropdown.Menu className={styles.dropDownMenu}>
				<Dropdown.Header>Recent</Dropdown.Header>
				<Dropdown.Item>
					<Icon name="filter" />
					Filter #1
				</Dropdown.Item>
				<Dropdown.Item>
					<Icon name="filter" />
					Filter #2
				</Dropdown.Item>
				<Dropdown.Header>Favorite</Dropdown.Header>
				<Dropdown.Item>
					<Icon name="filter" />
					FavFilter #1
				</Dropdown.Item>
				<Dropdown.Item>
					<Icon name="filter" />
					FavFilter #2
				</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item>View all filters</Dropdown.Item>
				<Dropdown.Item>Advanced issue search</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default FiltersMenu;
