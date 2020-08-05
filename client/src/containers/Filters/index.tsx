import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './logic/actions';
import { RootState } from 'typings/rootState';
import { Button, Table, Input, Dropdown, Form } from 'semantic-ui-react';
import { ReactComponent as HeaderStar } from './headerStart.svg';

const Filters: React.FC = () => {
	const dispatch = useDispatch();
	const { filters, filterParts } = useSelector((rootState: RootState) => rootState.filters);

	useEffect(() => {
		dispatch(actions.fetchFilterParts());
		dispatch(actions.fetchFilters());
		dispatch(actions.fetchFilterDefs());
	}, []);

	const renderFilterItem = (filterPart: WebApi.Entities.FilterPart) => {
		const { id, filterId } = filterPart;
		const filter = filters.find(({ id }) => filterId === id);
		// const staredBy = filter.staredBy.length; // TODO: Implement when User entity will be ready
		return (
			<Table.Row key={id}>
				<Table.HeaderCell> ⭐ </Table.HeaderCell>
				<Table.HeaderCell>{filter?.name}</Table.HeaderCell>
				<Table.HeaderCell>{filter?.ownerId}</Table.HeaderCell>
				{/* <Table.HeaderCell>{staredBy} person</Table.HeaderCell> */}
				<Table.HeaderCell>
					<Dropdown text="...">
						<Dropdown.Menu>
							<Dropdown.Item text="Edit" />
							<Dropdown.Divider />
							<Dropdown.Item text="Share..." />
						</Dropdown.Menu>
					</Dropdown>
				</Table.HeaderCell>
			</Table.Row>
		);
	};

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
				<Table fixed>
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

					<Table.Body>{filterParts.map(renderFilterItem)}</Table.Body>
				</Table>
			</div>
		</div>
	);
};

export default Filters;
