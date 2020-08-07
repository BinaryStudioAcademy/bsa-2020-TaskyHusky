import React, { useState } from 'react';
import { Input, Form, Dropdown } from 'semantic-ui-react';
import styles from './styles.module.scss';

type ProjectsFilterProps = {
	filterPart: FilterPartState;
};
interface DropdownSearchMenuProps {
	title: string;
	members: string[];
	data: any[];
}
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

	const SearchInput = () => <Input icon="search" placeholder={`Search by ${title}`} />;

	const getByFilterType = (filterType: string) => {
		switch (filterType) {
			case 'comment':
				return SearchInput;
			case 'projects':
				return ProjectsFilter;
			case 'issueTypes':
				return IssueTypeFilter;
			case 'issueStatus':
				return IssueStatusFilter;
			case 'assignee':
				return AssigneeFilter;
			default:
				return null;
		}
	};

	const Filter = getByFilterType(filterType);

	return (
		<Form.Field
			className={styles.filterField}
			control={() => (Filter ? <Filter filterPart={filterPart} /> : null)}
		/>
	);
};

const DropdownSearchMenu = ({ data, title, members }: DropdownSearchMenuProps) => {
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

const ProjectsFilter = ({ filterPart }: ProjectsFilterProps) => {
	const projects = [
		{
			name: 'project1',
			id: 'project1',
		},
		{
			name: 'project2',
			id: 'project2',
		},
	];

	const projectsToDropdownData = (project: { name: string; id: string }) => {
		const { id, name } = project;
		const data = {
			value: 'project',
			key: id,
			text: name,
		};
		return data;
	};

	const data = projects.map(projectsToDropdownData);

	return <DropdownSearchMenu data={data} members={filterPart.members} title={filterPart.filterDef.title} />;
};

const IssueTypeFilter = ({ filterPart }: ProjectsFilterProps) => {
	const issueTypes = [
		{
			name: 'issueTypes1',
			id: 'issueTypes1',
		},
		{
			name: 'issueTypes2',
			id: 'issueTypes2',
		},
	];

	const issueTypesToDropdownData = (issueType: { name: string; id: string }) => {
		const { id, name } = issueType;
		const data = {
			value: 'issueType',
			key: id,
			text: name,
		};
		return data;
	};

	const data = issueTypes.map(issueTypesToDropdownData);

	return <DropdownSearchMenu data={data} members={filterPart.members} title={filterPart.filterDef.title} />;
};

const IssueStatusFilter = ({ filterPart }: ProjectsFilterProps) => {
	return <DropdownSearchMenu data={[]} members={filterPart.members} title={filterPart.filterDef.title} />;
};

const AssigneeFilter = ({ filterPart }: ProjectsFilterProps) => {
	return <DropdownSearchMenu data={[]} members={filterPart.members} title={filterPart.filterDef.title} />;
};

export default FilterPart;
