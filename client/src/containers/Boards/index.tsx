import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button, Input, Table } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import * as actions from './logic/actions';

import CreateProjectModal from './../../components/CreateProjectModal';
import styles from './styles.module.scss';

const Boards: React.FC = () => {
	const [searchName, setSearchName] = useState('');
	const [isModalShown, setIsModalShown] = useState(false);
	const dispatch = useDispatch();
	const boards = useSelector((rootState: RootState) => rootState.boards.boards);

	useEffect(() => {
		dispatch(actions.startLoading());
	}, []);

	const onCreateBoard = () => {};

	const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const searchValue = event.target.value;
		setSearchName(searchValue);
	};

	const searchString = new RegExp(searchName, 'i');
	const filteredData = (boards || []).filter(({ name }) => searchString.test(name));

	return (
		<div className={styles.wrapper}>
			{isModalShown ? (
				<CreateProjectModal setIsModalShown={setIsModalShown} onCreateProject={onCreateBoard} />
			) : (
				''
			)}
			<div className={styles.wrapper__title}>
				<h1 className={styles.title}>Boards</h1>
				<Button primary onClick={() => setIsModalShown(true)}>
					Create board
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
							<Table.HeaderCell>Type</Table.HeaderCell>
							<Table.HeaderCell>Admin</Table.HeaderCell>
							<Table.HeaderCell>Location</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{filteredData.map(({ location, name, id, boardType, createdBy: user }) => {
							return (
								<Table.Row key={id}>
									<Table.Cell>{name}</Table.Cell>
									<Table.Cell>{boardType}</Table.Cell>
									<Table.Cell>{`${user.firstName} ${user.lastName}`}</Table.Cell>
									<Table.Cell>{location}</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table>
			</div>
		</div>
	);
};

export default Boards;
