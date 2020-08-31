import React, { useState } from 'react';
import { Input, Dropdown, Button, InputOnChangeData } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import { FilterPartState } from 'containers/AdvancedSearch/logic/state';
import { updateFilterPart } from 'containers/AdvancedSearch/logic/actions';
import { useTranslation } from 'react-i18next';

interface DropdownTextSearchProps {
	filterPart: FilterPartState;
}

const DropdownTextSearch = ({ filterPart }: DropdownTextSearchProps) => {
	const dispatch = useDispatch();
	const { filterDef, searchText: text } = filterPart;
	const { title } = filterDef;
	const { t } = useTranslation();

	const [searchText, setSearchText] = useState(text);

	const formDropdownTitle = (): string => {
		return !!searchText ? `${title}: ${searchText}` : title;
	};

	const [dropdownTitle, setDropdownTitle] = useState(formDropdownTitle());

	const onUpdate = (e: React.SyntheticEvent) => {
		filterPart.searchText = searchText;
		dispatch(updateFilterPart({ filterPart }));
		setDropdownTitle(`${title}: ${searchText}`);
	};

	const onCancel = (e: React.SyntheticEvent) => {
		filterPart.searchText = '';
		dispatch(updateFilterPart({ filterPart }));
		setDropdownTitle(title);
	};

	const getInputPlaceholder = (title: string) => {
		return `${t('find_by')} ${t(title)}`;
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
		const { value } = data;
		setSearchText(value);
	};

	return (
		<Dropdown closeOnChange={false} trigger={<span>{t(dropdownTitle)}</span>} icon="angle down" floating labeled>
			<Dropdown.Menu onClick={(e: Event) => e.stopPropagation()}>
				<Input
					value={searchText}
					onChange={handleChange}
					placeholder={getInputPlaceholder(title)}
					icon={null}
					className={styles.textSearch}
				/>
				<div className={styles.dropdownBtns}>
					<Button compact onClick={onUpdate}>
						{t('update')}
					</Button>
					<Button compact onClick={onCancel} as="a">
						{t('cancel')}
					</Button>
				</div>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default DropdownTextSearch;
