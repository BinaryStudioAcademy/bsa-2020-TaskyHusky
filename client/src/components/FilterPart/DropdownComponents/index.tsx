import React, { useState } from 'react';
import { Input, Dropdown, Button } from 'semantic-ui-react';
import styles from '../styles.module.scss';

interface DropdownSearchProps {
	title: string;
	members: string[];
	data: any[];
}
interface DropdownTextSearchProps {
	title: string;
	searchText: string;
	data: any[];
}

export const DropdownTextSearch = ({ data, title, searchText }: DropdownTextSearchProps) => {
	const [text, setText] = useState(title);
	return (
		<Dropdown text={text} icon="angle down" floating labeled>
			<Dropdown.Menu onClick={(e: Event) => e.stopPropagation()}>
				<Input icon="search" iconPosition="left" className={styles.textSearch} />
				<Button>Save</Button>
				<Button>Cancel</Button>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export const DropdownSearch = ({ data, title, members }: DropdownSearchProps) => {
	const [text, setText] = useState(title);
	return (
		<Dropdown text={text} icon="angle down" floating labeled>
			<Dropdown.Menu onClick={(e: Event) => e.stopPropagation()}>
				<Input icon="search" iconPosition="left" className={styles.search} />
				<Dropdown.Divider />
				<Dropdown.Header icon="folder open" content={title} />
				<Dropdown.Menu scrolling>
					{data.map((option) => (
						<Dropdown.Item key={option.key} value={option.value} text={option.text} />
					))}
				</Dropdown.Menu>
			</Dropdown.Menu>
		</Dropdown>
	);
};
