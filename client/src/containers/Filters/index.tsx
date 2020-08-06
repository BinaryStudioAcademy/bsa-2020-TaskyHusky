import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './logic/actions';
import { RootState } from 'typings/rootState';
import { Button, Table, Input, Dropdown, Form } from 'semantic-ui-react';
import { ReactComponent as HeaderStar } from './headerStart.svg';
import FilterItem from 'components/FilterItem';
import { getFullUserName } from './logic/helpers';

const Filters: React.FC = () => {
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
						<h1 className={styles.title}>Filters</h1>
					</div>
					<div className={styles.actionWrapper}>
						<Button primary>Create filter</Button>
					</div>
				</div>
				<div className={styles.bottomBarWrapper}>
					<Form>
						<Form.Group>
							<Form.Field control={Input} icon="search" placeholder="Search..." />
							<Form.Field control={Dropdown} placeholder="Owner" search selection options={[]} />
							<Form.Field control={Dropdown} placeholder="Project" search selection options={[]} />
							<Form.Field control={Dropdown} placeholder="Group" search selection options={[]} />
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
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Owner</Table.HeaderCell>
							<Table.HeaderCell>Stared by</Table.HeaderCell>
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
