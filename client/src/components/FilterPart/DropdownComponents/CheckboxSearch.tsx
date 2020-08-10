import React, { useState } from 'react';
import { Input, Dropdown, CheckboxProps, Checkbox, Icon, Label } from 'semantic-ui-react';
import styles from './styles.module.scss';
interface DropdownSearchProps {
	title: string;
	inputPlaceholder: string;
	members: string[];
	data: any[];
}

type ItemDropdownOption = {
	key: string;
	icon?: string;
	color?: string;
	text?: string;
};

const DropdownSearch = ({ inputPlaceholder, data, title, members }: DropdownSearchProps) => {
	const [text] = useState(title);
	const [selection, setSelection] = useState([]);

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
			items.push(<Icon key={`icon-${key}`} name={`${icon}` as 'folder'} />);
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

	return (
		<Dropdown multiple className={styles.dropdown} text={text} icon="angle down" floating labeled>
			<Dropdown.Menu className={styles.dropdownMenu} onClick={(e: Event) => e.stopPropagation()}>
				<Input
					placeholder={inputPlaceholder}
					icon="search"
					iconPosition="left"
					className={styles.searchInput}
				/>
				<Dropdown.Divider />
				<Dropdown.Header icon="folder open" content={title} />
				<Dropdown.Menu scrolling>
					{data.map((option) => (
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
