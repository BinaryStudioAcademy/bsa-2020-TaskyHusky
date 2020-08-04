import React, { useState } from 'react';
import styles from './styles.module.scss';
import { FilterState } from './logic/state';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as actions from './logic/actions';
import { RootState } from 'typings/rootState';
import { Button, Table, Input, Dropdown, Form } from 'semantic-ui-react';

// interface FiltersPropsI {
// 	filters: WebApi.Entities.Filter[]
// }

const Filters: React.FC<FilterState> = ({ filters }: FilterState) => {
	// const [filters, setFilters] = useState<WebApi.Entities.Filter[]>([]);

	// const dispatch = useDispatch();
	// const filters = useSelector((rootState: RootState) => rootState.filters);
	// const users = useSelector((rootState: RootState) => rootState.users);
	// const projects = useSelector((rootState: RootState) => rootState.projects);
	// const getExampleText = (exampleName: string) => {
	// 	dispatch(actions.getExampleText({ exampleName }));
	// };

	const renderFilterItem = (filter: WebApi.Entities.Filter) => {
		const { id, name, stared, ownerId } = filter;
		return (
			<Table.Row>
				<Table.HeaderCell> {stared} </Table.HeaderCell>
				<Table.HeaderCell>{name}</Table.HeaderCell>
				<Table.HeaderCell>{ownerId}</Table.HeaderCell>
				{/* <Table.HeaderCell>Access</Table.HeaderCell>
				<Table.HeaderCell>Starred by</Table.HeaderCell> */}
				<Table.HeaderCell> </Table.HeaderCell>
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
							<Form.Field
								control={Dropdown}
								placeholder="Owner"
								search
								selection
								options={[
									{ key: '1', value: 'User1' },
									{ key: '2', value: 'User2' },
								]}
							/>
							<Form.Field
								control={Dropdown}
								placeholder="Project"
								search
								selection
								options={[
									{ key: '1', value: 'Project1' },
									{ key: '2', value: 'Project2' },
								]}
							/>
							<Form.Field
								control={Dropdown}
								placeholder="Group"
								search
								selection
								options={[
									{ key: '1', value: 'Group1' },
									{ key: '2', value: 'Group2' },
								]}
							/>
						</Form.Group>
					</Form>
				</div>
			</div>
			<div>
				<Table fixed>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell> * </Table.HeaderCell>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Owner</Table.HeaderCell>
							{/* <Table.HeaderCell>Access</Table.HeaderCell>
							<Table.HeaderCell>Starred by</Table.HeaderCell> */}
							<Table.HeaderCell> </Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>{filters.map(renderFilterItem)}</Table.Body>
				</Table>
			</div>
		</div>
	);
};

const mapStateToProps = (state: RootState) => {
	console.log(state);
	return {
		filters: state.filters.filters,
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps)(Filters);
