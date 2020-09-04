import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { getFullUserName } from './logic/helpers';
import FilterItem from 'components/FilterItem';
import styles from './styles.module.scss';

interface Props {
	filters: WebApi.Entities.Filter[];
	updateFilter: (data: WebApi.Entities.Filter) => void;
}

const FiltersTable = ({ filters, updateFilter }: Props) => {
	const { t } = useTranslation();

	return (
		<div>
			<Table selectable sortable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell
							width={1}
							className={`${styles.headerCell} ${styles.starCell}`}
							children={<Icon name="star" />}
						/>
						<Table.HeaderCell width={4} className={styles.headerCell} children={t('name')} />
						<Table.HeaderCell width={4} className={styles.headerCell} children={t('owner')} />
						<Table.HeaderCell width={4} className={styles.headerCell} children={t('favorite')} />
						<Table.HeaderCell width={1} className={styles.headerCell} />
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{filters.map((filter) => (
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
