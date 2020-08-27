import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './logic/actions';
import { RootState } from 'typings/rootState';
import { Button, Table, Input, Dropdown, Form } from 'semantic-ui-react';
import { ReactComponent as HeaderStar } from './headerStart.svg';
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
						<Button primary>{t('create_filter')}</Button>
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
				<Table selectable padded={'very'} compact>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>
								{' '}
								<HeaderStar />{' '}
							</Table.HeaderCell>
							<Table.HeaderCell>{t('name')}</Table.HeaderCell>
							<Table.HeaderCell>{t('owner')}</Table.HeaderCell>
							<Table.HeaderCell>{t('favorite')}</Table.HeaderCell>
							<Table.HeaderCell> </Table.HeaderCell>
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
