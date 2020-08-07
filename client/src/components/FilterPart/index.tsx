import React, { useState } from 'react';
import { Input, Form, Dropdown } from 'semantic-ui-react';
import styles from './styles.module.scss';

interface FilterPartState {
	id: string;
	members: string[];
	searchText: string;
	filterDef: WebApi.Entities.FilterDefinition;
}

interface Props {
	filterPart: FilterPartState;
}

const FilterPart = ({ filterPart }: Props) => {
	const { id, filterDef, searchText, members } = filterPart;
	const { title, filterType } = filterDef;
	// data types are entities for example 'project', 'issueType', 'assignee'
	// So if it is project we should render all available projects
	const [text, setText] = useState(title);
	const tagOptions = [
		{
			key1: 'Important',
			text: 'Important',
		},
		{
			key1: 'Announcement',
			text: 'Announcement',
		},
	];

	const DropdownSearchInMenu = () => (
		<Dropdown text={text} icon="angle down" floating labeled>
			<Dropdown.Menu onClick={(e: Event) => e.stopPropagation()}>
				<Input icon="search" iconPosition="left" className={styles.search} />
				<Dropdown.Divider />
				<Dropdown.Header icon="folder open" content={title} />
				<Dropdown.Menu scrolling>
					{tagOptions.map((option) => (
						<Dropdown.Item key={option.key1} {...option} />
					))}
				</Dropdown.Menu>
			</Dropdown.Menu>
		</Dropdown>
	);

	const SearchInput = () => <Input icon="search" placeholder={`Search by ${title}`} />;

	const getByFilterType = (filterType: string) => {
		switch (filterType) {
			case 'search':
				return SearchInput;
			case 'projects':
				return ProjectsFilter;
			// return DropdownSearchInMenu;
			default:
				return null;
		}
	};

	const Filter = getByFilterType(filterType);
	return <Filter filterPart={filterPart} />;

	return <Form.Field className={styles.filterField} control={renderByFilterType(filterType)} />;
};

type ProjectsFilterProps = {
	filterPart: FilterPartState;
};

const ProjectsFilter = ({ filterPart }) => {
	return <DropdownSearchInMenu members title />;
};

export default FilterPart;
