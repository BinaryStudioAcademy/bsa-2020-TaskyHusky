import React, { useState, ChangeEvent, useEffect } from 'react';
import { Input, Table } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import * as actions from './logic/actions';

import CreateProjectModal from '../CreateProjectModal';
import styles from './styles.module.scss';
import Spinner from 'components/common/Spinner';

const Projects: React.FC = () => {
	const dispatch = useDispatch();

	const [searchName, setSearchName] = useState('');

	const { projects, isLoading } = useSelector((rootState: RootState) => rootState.projects);

	useEffect(() => {
		dispatch(actions.startLoading());
	}, [dispatch]);

	const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const searchValue = event.target.value;
		setSearchName(searchValue);
	};

	const searchString = new RegExp(searchName, 'i');
	const filteredData = (projects || []).filter(({ name }) => searchString.test(name));

	return (
		<div className={styles.wrapper}>
			<div className={styles.wrapper__title}>
				<h1 className={styles.title}>Projects</h1>
				<CreateProjectModal />
			</div>
			<div className={[styles.wrapper__filters, styles.filters].join(' ')}>
				<Input icon="search" placeholder="Search..." onChange={onSearch} value={searchName} />
			</div>
			<div className={styles.wrapper__table}>
				<Table celled fixed>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Key</Table.HeaderCell>
							<Table.HeaderCell>Type</Table.HeaderCell>
							<Table.HeaderCell>Settings</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					{isLoading ? (
						<Spinner />
					) : (
						<Table.Body>
							{filteredData.map(({ id, name, key }) => (
								<Table.Row key={id}>
									<Table.Cell>{name}</Table.Cell>
									<Table.Cell>{key}</Table.Cell>
									<Table.Cell>Cell</Table.Cell>
									<Table.Cell>Cell</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					)}
				</Table>
			</div>
		</div>
	);
};

export default Projects;
