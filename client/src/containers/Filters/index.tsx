import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './logic/actions';
import { RootState } from 'typings/rootState';
import { Button, Table, Input, Dropdown, Form, Icon } from 'semantic-ui-react';
import FilterItem from 'components/FilterItem';
import { getFullUserName } from './logic/helpers';
import { useTranslation } from 'react-i18next';

const Filters: React.FC = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { filters } = useSelector((rootState: RootState) => rootState.filters);

	const updateFilter = (data: WebApi.Entities.Filter) => {
		dispatch(
			actions.updateFilter({
				data,
			}),
		);
	};

	useEffect(() => {
		dispatch(actions.fetchFilterParts());
		dispatch(actions.fetchFilters());
		dispatch(actions.fetchFilterDefs());
	}, [dispatch]);

	return (
		<div className={styles.filtersContainer}>
			<div className={styles.outer}>
				<div className={styles.titleWrapper}>
					<div className={styles.titleContainer}>
						<h1 className={styles.title}>{t('filters')}</h1>
					</div>
					<div className={styles.actionWrapper}>
						<Button className={styles.createButton}>{t('create_filter')}</Button>
					</div>
				</div>
				<div className={styles.bottomBarWrapper}>
					<Form>
						<Form.Group>
							<Form.Field control={Input} icon="search" placeholder={t('search')} />
							<Form.Field control={Dropdown} placeholder={t('owner')} search selection options={[]} />
							<Form.Field control={Dropdown} placeholder={t('project')} search selection options={[]} />
							<Form.Field control={Dropdown} placeholder={t('group')} search selection options={[]} />
						</Form.Group>
					</Form>
				</div>
			</div>
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
		</div>
	);
};

export default Filters;
