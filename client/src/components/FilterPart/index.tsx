import React from 'react';
import { Form } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { getByFilterType } from './helper';

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
	const { filterDef } = filterPart;
	const { filterType } = filterDef;

	const Filter = getByFilterType(filterType);

	return Filter ? (
		<Form.Field className={styles.filterField} control={() => <Filter filterPart={filterPart} />} />
	) : null;
};

export default FilterPart;
