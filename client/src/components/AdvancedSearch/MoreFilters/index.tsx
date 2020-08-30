import React from 'react';
import { Dropdown, Checkbox, Icon, DropdownItemProps } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { FilterPartState } from 'containers/AdvancedSearch/logic/state';
import { useTranslation } from 'react-i18next';

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
	const handleClick = (event: React.SyntheticEvent, data: DropdownItemProps) => {
		const { value } = data;
		const updatedAddedFilterParts = addedFilterParts.find((addedPart) => addedPart.id === value)
			? addedFilterParts.filter(({ id }) => id !== `${value}`)
			: ([...addedFilterParts, additionalFilterParts.find(({ id }) => id === value)] as FilterPartState[]);

		setAddedFilterParts(updatedAddedFilterParts);
	};
	const isAdded = (filterPartId: string) => {
		const filterPart = addedFilterParts.find(({ id }) => id === filterPartId);
		return Boolean(filterPart);
	};
	const { t } = useTranslation();

	return (
		<Dropdown
			trigger={
				<span className={styles.moreText}>
					<Icon color="blue" name="plus" /> {t('more')}
				</span>
			}
			icon={null}
			floating
			labeled
			multiple
			className={styles.moreFilterDropdown}
		>
			<Dropdown.Menu className={styles.dropdownMenu} onClick={(e: Event) => e.stopPropagation()}>
				<Dropdown.Header icon="filter" content={t('criteria')} />
				<Dropdown.Menu scrolling>
					{additionalFilterParts.map(({ id, filterDef }) => (
						<Dropdown.Item onClick={handleClick} key={id} value={id}>
							<Checkbox label={filterDef.title} checked={isAdded(id)} />
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default MoreFilterDefsDropdown;
