import React, { useState } from 'react';
import { Input, Dropdown, CheckboxProps, Checkbox, Icon, Label, InputOnChangeData } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { FilterPartState } from 'containers/AdvancedSearch/logic/state';

interface DropdownSearchProps {
	filterPart: FilterPartState;
	data: any[];
}

type ItemDropdownOption = {
	key: string;
	icon?: string;
	color?: string;
	text?: string;
};

const DropdownSearch = ({ filterPart, data }: DropdownSearchProps) => {
	const { filterDef } = filterPart;
	const { title } = filterDef;
	const [text] = useState(title);
	const [selection, setSelection] = useState([]);
	const [searchText, setSearchText] = useState('');

	const toggleSelection = (e: React.SyntheticEvent, { label, checked }: CheckboxProps) => {
		if (checked) {
			setSelection([...selection, label] as never[]);
		} else {
			setSelection(selection.filter((el) => el !== label));
		}
	};

	const renderLabel = (option: ItemDropdownOption) => {
		const { icon, color, text, key } = option;

		const items = [];
		if (icon) {
			items.push(<Icon color={color as 'red'} key={`icon-${key}`} name={icon as 'folder'} />);
		}
		if (color) {
			items.push(
				<Label key={`label-${key}`} horizontal color={color as 'red'}>
					{text}
				</Label>,
			);
		} else {
			items.push(text);
		}

		return items;
	};

	const getInputPlaceholder = ({ title }: WebApi.Entities.FilterDefinition) => {
		return `Find ${title}`;
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
		const { value } = data;
		setSearchText(value);
	};

	const searchString = new RegExp(searchText, 'i');
	const filteredData = (data || []).filter(({ text }) => searchString.test(text));

	return (
		<Dropdown multiple className={styles.dropdown} text={text} icon="angle down" floating labeled>
			<Dropdown.Menu className={styles.dropdownMenu} onClick={(e: Event) => e.stopPropagation()}>
				<Input
					placeholder={getInputPlaceholder(filterDef)}
					icon="search"
					value={searchText}
					iconPosition="left"
					className={styles.searchInput}
					onChange={handleSearchChange}
				/>
				<Dropdown.Divider />
				<Dropdown.Header icon="folder open" content={title} />
				<Dropdown.Menu scrolling>
					{filteredData.map((option) => (
						<Dropdown.Item key={option.key}>
							<Checkbox label={<label>{renderLabel(option)}</label>} onChange={toggleSelection} />
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default DropdownSearch;
