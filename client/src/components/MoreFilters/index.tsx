import React from 'react';
import { Input, Icon, Dropdown, DropdownItemProps } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { FilterPartState } from 'containers/AdvancedSearch/logic/state';

interface MoreFilterDefsDropdownProps {
	additionalFilterParts: FilterPartState[];
	addedFilterParts: FilterPartState[];
	setAddedFilterParts: (data: FilterPartState[]) => void;
}

const MoreFilterDefsDropdown = ({
	addedFilterParts,
	additionalFilterParts,
	setAddedFilterParts,
}: MoreFilterDefsDropdownProps) => {
	const getDropdownData = (filterParts: FilterPartState[]) => {
		return filterParts.map((filterPart) => {
			const { id, filterDef } = filterPart;
			return {
				key: id,
				text: filterDef.title,
				value: id,
			};
		});
	};
	const handleClick = (event: React.SyntheticEvent, data: DropdownItemProps) => {
		const { value } = data;
		const updatedAddedFilterParts = addedFilterParts.find((addedPart) => addedPart.id === value)
			? addedFilterParts.filter(({ id }) => id !== `${value}`)
			: [...addedFilterParts, additionalFilterParts.find(({ id }) => id === value)];

		setAddedFilterParts(updatedAddedFilterParts as FilterPartState[]);
	};
	return (
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
				<Dropdown.Menu scrolling>
					{getDropdownData(additionalFilterParts).map((option) => (
						<Dropdown.Item onClick={handleClick} key={option.key} value={option.value} text={option.text} />
					))}
				</Dropdown.Menu>
			</Dropdown.Menu>
		</Dropdown>
	);
};
export default MoreFilterDefsDropdown;
