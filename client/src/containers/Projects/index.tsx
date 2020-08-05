import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button, Input, Table } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import * as actions from './logic/actions';

import CreateProjectModal from './../../components/CreateProjectModal';
import styles from './styles.module.scss';

const Projects: React.FC = () => {
	const [searchName, setSearchName] = useState('');
	const [isModalShown, setIsModalShown] = useState(false);
	const dispatch = useDispatch();
	const projects = useSelector((rootState: RootState) => rootState.projects.projects);

	useEffect(() => {
		dispatch(actions.startLoading());
	});

	const onCreateProject = () => {};

	const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const searchValue = event.target.value;
		setSearchName(searchValue);
	};

	const searchString = new RegExp(searchName, 'i');
	const filteredData = projects.filter(({ name }) => searchString.test(name));

	return (
		<div className={styles.wrapper}>
			{isModalShown ? (
				<CreateProjectModal setIsModalShown={setIsModalShown} onCreateProject={onCreateProject} />
			) : (
				''
			)}
			<div className={styles.wrapper__title}>
				<h1 className={styles.title}>Projects</h1>
				<Button primary onClick={() => setIsModalShown(true)}>
					Create project
				</Button>
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

					<Table.Body>
						{filteredData.map(({ projectID, name }) => (
							<Table.Row key={projectID}>
								<Table.Cell>{name}</Table.Cell>
								<Table.Cell>Cell</Table.Cell>
								<Table.Cell>Cell</Table.Cell>
								<Table.Cell>Cell</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</div>
		</div>
	);
};

export default Projects;
