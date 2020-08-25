import React, { useState, ChangeEvent, useEffect, SyntheticEvent } from 'react';
import { Button, Input, Table, Dropdown, DropdownProps } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import * as actions from './logic/actions';
import { createBoard } from './logic/actionTypes';
import Options, { ConfigItem } from '../../components/common/Options';
import CreateBoardModal from '../../components/CreateBoardModal';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import DeleteBoardModal from '../../components/deleteBoardModal';
import { useTranslation } from 'react-i18next';
import Spinner from '../../components/common/Spinner';

const Boards: React.FC = () => {
	const { t } = useTranslation();
	const boardTypes = ['Kanban', 'Scrum'];
	const [searchName, setSearchName] = useState('');
	const [selectedTypes, setSelectedType] = useState<WebApi.Board.BoardType[]>([]);
	const [isModalShown, setIsModalShown] = useState(false);
	const [boardToDelete, setBoardToDelete] = useState<WebApi.Board.IBoardModel | null>(null);
	const dispatch = useDispatch();
	const { boards, isLoading } = useSelector((rootState: RootState) => rootState.boards);

	useEffect(() => {
		dispatch(actions.startLoading());
	}, [dispatch]);

	const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const searchValue = event.target.value;
		setSearchName(searchValue);
	};

	const searchString = new RegExp(searchName, 'i');
	const filteredData = (boards || [])
		.filter(({ name }) => searchString.test(name))
		.filter((board) => {
			if (!selectedTypes.length) {
				return true;
			}
			return selectedTypes.indexOf(board.boardType) !== -1;
		});
	const selectOptions = boardTypes.map((type, index) => ({
		key: index,
		value: type,
		text: type,
	}));

	const handleSelectChange = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
		setSelectedType([...(data.value as WebApi.Board.BoardType[])]);
	};

	const onCreateBoard = (board: createBoard) => {
		dispatch(actions.createBoard({ ...board }));
	};

	const getBoardMenuActions = (board: WebApi.Board.IBoardModel): ConfigItem[] => [
		{
			onClickAction: () => {},
			id: board.id,
			text: t('edit_settings'),
		},
		{
			onClickAction: () => {},
			id: board.id,
			text: t('copy'),
		},
		{
			onClickAction: () => {},
			id: board.id,
			text: t('move'),
		},
		{
			onClickAction: getDeleteAction(board),
			id: board.id,
			text: t('delete'),
		},
	];

	const getDeleteAction = (board: WebApi.Board.IBoardModel) => {
		return () => {
			setBoardToDelete(board);
		};
	};

	return (
		<div className={styles.wrapper}>
			{isModalShown ? <CreateBoardModal setIsModalShown={setIsModalShown} onCreateBoard={onCreateBoard} /> : ''}
			{boardToDelete && <DeleteBoardModal board={boardToDelete} onClose={() => setBoardToDelete(null)} />}
			<div className={styles.wrapper__title}>
				<h1 className={styles.title}>{t('boards')}</h1>
				<Button primary onClick={() => setIsModalShown(true)}>
					{t('create_board')}
				</Button>
			</div>
			<div className={[styles.wrapper__filters, styles.filters].join(' ')}>
				<Input icon="search" placeholder={t('search')} onChange={onSearch} value={searchName} />
				<Dropdown
					placeholder="All boards"
					options={selectOptions}
					multiple
					selection
					value={selectedTypes}
					onChange={handleSelectChange}
				/>
			</div>
			<div className={styles.wrapper__table}>
				{!isLoading && (
					<Table celled fixed>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell width={5}>Name</Table.HeaderCell>
								<Table.HeaderCell width={5}>Type</Table.HeaderCell>
								<Table.HeaderCell width={5}>Admin</Table.HeaderCell>
								<Table.HeaderCell width={1} />
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{filteredData.map((board) => {
								const { name, id, boardType, createdBy: user } = board;
								return (
									<Table.Row key={id}>
										<Table.Cell>
											<Link to={`/board/${id}`}>{name}</Link>
										</Table.Cell>
										<Table.Cell>{boardType}</Table.Cell>
										<Table.Cell>
											<Link
												to={`/profile/${user.id}`}
											>{`${user.firstName} ${user.lastName}`}</Link>
										</Table.Cell>
										<Table.Cell>
											<Options config={getBoardMenuActions(board)} />
										</Table.Cell>
									</Table.Row>
								);
							})}
						</Table.Body>
					</Table>
				)}
				{isLoading ? <Spinner /> : ''}
			</div>
		</div>
	);
};

export default Boards;
