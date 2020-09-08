import React, { useState, ChangeEvent, useEffect, SyntheticEvent } from 'react';
import { Button, Input, Table, Dropdown, DropdownProps, Popup } from 'semantic-ui-react';
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
import UserAvatar from 'components/common/UserAvatar';
import FiltersHeader from 'components/FiltersHeader';
import historyHelper from 'helpers/history.helper';

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
			onClickAction: () => historyHelper.push(`/board/${board.id}/columnsSettings`),
			id: board.id,
			text: t('edit_settings'),
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

	const projectsShown = 2;
	const cellProjects = (board: WebApi.Board.IBoardModel) => (board.projects ?? []).slice(0, projectsShown);
	const portalProjects = (board: WebApi.Board.IBoardModel) => (board.projects ?? []).slice(projectsShown);

	return (
		<div className={styles.wrapper}>
			{isModalShown ? <CreateBoardModal setIsModalShown={setIsModalShown} onCreateBoard={onCreateBoard} /> : ''}
			{boardToDelete && <DeleteBoardModal board={boardToDelete} onClose={() => setBoardToDelete(null)} />}
			<FiltersHeader title={t('boards')} />
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<div className={[styles.wrapper__filters, styles.filters].join(' ')}>
						<Input
							icon="search"
							className="standartInput"
							placeholder={t('search')}
							onChange={onSearch}
							value={searchName}
						/>
						<Dropdown
							placeholder={t('all_boards')}
							options={selectOptions}
							multiple
							selection
							className="standartSelect"
							value={selectedTypes}
							onChange={handleSelectChange}
						/>
						<Button
							style={{ marginLeft: 'auto' }}
							className="primaryBtn"
							onClick={() => setIsModalShown(true)}
						>
							{t('create_board')}
						</Button>
					</div>
					<div className={styles.wrapper__table}>
						<Table selectable sortable>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell width={4} className={styles.header__cell}>
										{t('name')}
									</Table.HeaderCell>
									<Table.HeaderCell width={4} className={styles.header__cell}>
										{t('type')}
									</Table.HeaderCell>
									<Table.HeaderCell width={4} className={styles.header__cell}>
										{t('projects')}
									</Table.HeaderCell>
									<Table.HeaderCell width={4} className={styles.header__cell}>
										{t('admin')}
									</Table.HeaderCell>
									<Table.HeaderCell width={1} className={styles.header__cell} />
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{filteredData.map((board) => {
									const { name, id, boardType, createdBy: user } = board;
									return (
										<Table.Row key={id}>
											<Table.Cell className="textData">
												<Link to={`/board/${id}`}>{name}</Link>
											</Table.Cell>
											<Table.Cell className="textData">{boardType}</Table.Cell>
											<Table.Cell>
												{board.projects && board.projects.length ? (
													<>
														<span>
															{cellProjects(board).map((project, i) => (
																<span key={i} className="textData">
																	<a
																		target="_blank"
																		rel="noopener noreferrer"
																		href={`/project/${project.id}/issues`}
																	>
																		{project.name}
																	</a>
																	{cellProjects(board).length - 1 === i ? '' : ', '}
																</span>
															))}
														</span>
														<span>
															{board.projects.length > projectsShown ? (
																<Popup
																	openOnTriggerMouseEnter
																	closeOnPortalMouseLeave
																	trigger={
																		<span className={styles.moreProjects}>
																			, ...
																		</span>
																	}
																	content={
																		<div>
																			{portalProjects(board).map((project, i) => (
																				<span key={i} className="textData">
																					<a
																						target="_blank"
																						rel="noopener noreferrer"
																						href={`/project/${project.id}/issues`}
																					>
																						{project.name}
																					</a>
																					{portalProjects(board).length -
																						1 ===
																					i
																						? ''
																						: ', '}
																				</span>
																			))}
																		</div>
																	}
																/>
															) : (
																''
															)}
														</span>
													</>
												) : (
													t('no')
												)}
											</Table.Cell>
											<Table.Cell className={styles.user_cell}>
												<UserAvatar user={user as WebApi.Entities.UserProfile} small />
												<Link to={`/profile/${user.id}`}>
													{`${user.firstName} ${user.lastName}`}
												</Link>
											</Table.Cell>
											<Table.Cell className={styles.options__cell}>
												<Options
													config={getBoardMenuActions(board)}
													isBackgroundShown={false}
												/>
											</Table.Cell>
										</Table.Row>
									);
								})}
							</Table.Body>
						</Table>
					</div>
				</>
			)}
		</div>
	);
};

export default Boards;
