import React, { useEffect, useState, useMemo, ChangeEvent } from 'react';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './logic/actions';
import { RootState } from 'typings/rootState';
import { Button, Table, Input, Icon } from 'semantic-ui-react';
import FilterItem from 'components/FilterItem';
import { getFullUserName } from './logic/helpers';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const Filters: React.FC = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const history = useHistory();
	const { filters } = useSelector((rootState: RootState) => rootState.filters);
	const { user } = useSelector((rootState: RootState) => rootState.auth);

	const [searchName, setSearchName] = useState('');

	const filteredFilters = useMemo(() => {
		if (searchName === '') {
			return filters;
		}

		const searchString = new RegExp(searchName, 'i');
		return filters.filter(({ name }) => searchString.test(name));
	}, [searchName, filters]);

	const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation();
		const searchValue = event.target.value;
		setSearchName(searchValue);
	};

	const updateFilter = (data: WebApi.Entities.Filter) => {
		dispatch(
			actions.updateFilter({
				data,
			}),
		);
	};

	const userId = user?.id;
	useEffect(() => {
		dispatch(actions.fetchFilters({ userId }));
	}, [dispatch, userId]);

	return (
		<div className={styles.filtersContainer}>
			<div className={styles.outer}>
				<div className={styles.titleWrapper}>
					<div className={styles.titleContainer}>
						<h1 className={styles.title}>{t('filters')}</h1>
					</div>
					<div className={styles.actionWrapper}>
						<Button className={styles.createBtn} onClick={() => history.push('/advancedSearch')} primary>
							{t('create_filter')}
						</Button>
					</div>
				</div>
				<div className={[styles.wrapperFilters, styles.filters].join(' ')}>
					<Input icon="search" placeholder={t('search')} onChange={onSearch} value={searchName} />
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
						{filteredFilters.map((filter) => (
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
