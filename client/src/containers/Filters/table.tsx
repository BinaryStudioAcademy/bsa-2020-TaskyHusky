import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import { Table, Icon } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { orderBy } from 'lodash-es';
import { getFullUserName } from './logic/helpers';
import FilterItem from 'components/FilterItem';
import styles from './styles.module.scss';

interface Props {
	filters: WebApi.Entities.Filter[];
	updateFilter: (data: WebApi.Entities.Filter) => void;
}

type SortByColumn = 'name' | 'owner' | 'favorite' | 'star';
type SortDirections = 'ascending' | 'descending';

const FiltersTable = ({ filters, updateFilter }: Props) => {
	const { t } = useTranslation();

	const { user } = useSelector((rootState: RootState) => rootState.auth);
	const [sortByColumn, setSortByColumn] = useState<SortByColumn>('star');
	const [sortDirection, setSortDirection] = useState<SortDirections>('descending');

	const sortedFilters: WebApi.Entities.Filter[] = useMemo(() => {
		if (sortByColumn === 'owner') {
			if (sortDirection === 'descending') {
				return orderBy(filters, (filter) => filter.owner.firstName, ['desc']);
			}
			return orderBy(filters, (filter) => filter.owner.firstName, ['asc']);
		}
		if (sortByColumn === 'favorite') {
			if (sortDirection === 'descending') {
				return orderBy(filters, (filter) => filter.staredBy?.length, ['desc']);
			}
			return orderBy(filters, (filter) => filter.staredBy?.length, ['asc']);
		}
		if (sortByColumn === 'star') {
			if (sortDirection === 'descending') {
				return orderBy(filters, (filter) => filter.staredBy?.some(({ id }) => id === user?.id), ['desc']);
			}
			return orderBy(filters, (filter) => filter.staredBy?.some(({ id }) => id === user?.id), ['asc']);
		}

		if (sortDirection === 'descending') {
			return orderBy(filters, [sortByColumn], ['desc']);
		}
		return orderBy(filters, [sortByColumn], ['asc']);
	}, [filters, sortDirection, sortByColumn, user]);

	const changeSort = (column: SortByColumn) => {
		if (column === sortByColumn) {
			const direction = sortDirection === 'ascending' ? 'descending' : 'ascending';
			setSortDirection(direction);
			return;
		}
		setSortDirection('descending');
		setSortByColumn(column);
	};
	return (
		<div>
			<Table selectable sortable unstackable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell
							width={1}
							className={`${styles.headerCell} ${styles.starCell}`}
							sorted={sortByColumn === 'star' ? sortDirection : undefined}
							onClick={() => changeSort('star')}
							children={<Icon name="star" />}
						/>
						<Table.HeaderCell
							width={4}
							className={styles.headerCell}
							sorted={sortByColumn === 'name' ? sortDirection : undefined}
							onClick={() => changeSort('name')}
							children={t('name')}
						/>
						<Table.HeaderCell
							width={4}
							className={styles.headerCell}
							sorted={sortByColumn === 'owner' ? sortDirection : undefined}
							onClick={() => changeSort('owner')}
							children={t('owner')}
						/>
						<Table.HeaderCell
							width={4}
							className={styles.headerCell}
							sorted={sortByColumn === 'favorite' ? sortDirection : undefined}
							onClick={() => changeSort('favorite')}
							children={t('favorite')}
						/>
						<Table.HeaderCell width={1} className={styles.headerCell} />
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{sortedFilters.map((filter) => (
						<FilterItem
							fullName={getFullUserName(filter.owner)}
							updateFilter={updateFilter}
							key={filter.id}
							filter={filter}
						/>
					))}
				</Table.Body>
			</Table>
		</div>
	);
};

export default FiltersTable;
