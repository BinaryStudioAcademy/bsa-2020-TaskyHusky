import React from 'react';
import { Input, Dropdown, Button } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { DropdownOption } from '../types';

interface DropdownTextSearchProps {
	title: string;
	searchText: string;
	data: DropdownOption[];
}

const DropdownTextSearch = ({ title }: DropdownTextSearchProps) => {
	return (
		<Dropdown trigger={<span>{title}</span>} icon="angle down" floating labeled>
			<Dropdown.Menu onClick={(e: Event) => e.stopPropagation()}>
				<Input icon={null} className={styles.textSearch} />
				<Button>Save</Button>
				<Button as="a">Cancel</Button>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default DropdownTextSearch;
