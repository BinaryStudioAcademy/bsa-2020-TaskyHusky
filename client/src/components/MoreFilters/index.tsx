import React from 'react';
import { Input, Icon, Dropdown } from 'semantic-ui-react';
import styles from './styles.module.scss';

const MoreFilterDefsDropdown = () => (
	<Dropdown
		className={styles.moreFilterDropdown}
		trigger={
			<span className={styles.moreText}>
				<Icon color="blue" name="plus" /> More
			</span>
		}
		icon={null}
	>
		<Dropdown.Menu onClick={(e: Event) => e.stopPropagation()}>
			<Input placeholder={'Search criteria'} icon="search" iconPosition="left" />
			<Dropdown.Divider />
			<Dropdown.Header icon="folder open" content={'Criteria'} />
			<Dropdown.Menu scrolling></Dropdown.Menu>
		</Dropdown.Menu>
	</Dropdown>
);

export default MoreFilterDefsDropdown;
