import React, { useState, useEffect } from 'react';
import NotFound from 'pages/404';
import { getBoardById } from 'services/board.service';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { DragDropContext, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import InteractiveColumn from 'containers/InteractiveColumn';
import { useDispatch, useSelector } from 'react-redux';
import { updateColumn, setColumnCreated } from 'containers/BoardColumn/logic/actions';
import CreateColumnModal from 'containers/CreateColumnModal';
import { Segment, Icon } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { RootState } from 'typings/rootState';

interface Props {
	boardId?: string;
}

const ColumnsSettingsPage: React.FC<Props> = ({ boardId: givenBoardId }) => {
	const { boardId: paramsBoardId } = useParams();
	const boardId = givenBoardId ?? paramsBoardId;
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [board, setBoard] = useState<WebApi.Result.ComposedBoardResult | undefined>();
	const [columns, setColumns] = useState<WebApi.Result.BoardColumnResult[]>([]);
	const { columnCreated, recentlyCreatedColumn } = useSelector((state: RootState) => state.boardColumn);

	useEffect(() => {
		if (columnCreated) {
			dispatch(setColumnCreated({ created: false }));

			if (recentlyCreatedColumn) {
				setColumns([...columns, recentlyCreatedColumn]);
			}
		}
	}, [dispatch, columnCreated, recentlyCreatedColumn, columns]);

	useEffect(() => {
		if (!board) {
			getBoardById(boardId).then((board) => {
				setBoard(board);
				setColumns(board.columns);
			});
		}
	}, [board, boardId]);

	if (!board) {
		return null;
	}

	if (board.boardType !== 'Kanban') {
		return <NotFound />;
	}

	const onDragEnd: OnDragEndResponder = (result, provided) => {
		const { destination, source, draggableId } = result;

		if (!destination || destination.index === source.index) {
			return;
		}

		const movedRight = destination.index > source.index;

		const filterRight = (c: WebApi.Result.BoardColumnResult) =>
			c.index > source.index && c.index <= destination.index;

		const filterLeft = (c: WebApi.Result.BoardColumnResult) =>
			c.index < source.index && c.index >= destination.index;

		const filter = movedRight ? filterRight : filterLeft;
		const filteredColumns = columns.filter(filter);
		const diff = movedRight ? -1 : 1;

		filteredColumns.forEach((c) => dispatch(updateColumn({ id: c.id, data: { index: c.index + diff } })));
		dispatch(updateColumn({ id: draggableId, data: { index: destination.index } }));

		const newColumns = [...columns];
		const movedColumnIndex = columns.findIndex((c) => c.index === source.index);
		newColumns[movedColumnIndex].index = destination.index;

		filteredColumns.forEach((col) => {
			const index = columns.findIndex((c) => col.id === c.id);

			if (index > -1) {
				newColumns[index].index += diff;
			}
		});

		setColumns(newColumns.sort((c0, c1) => (c0.index < c1.index ? -1 : 1)));
	};

	return (
		<div className={styles.wrapper}>
			<div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
				<h1 style={{ margin: 0 }} className="standartHeader">
					{board.name}
				</h1>
			</div>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="0" direction="horizontal">
					{(provided, snapshot) => (
						<div className={styles.columnsContainer} ref={provided.innerRef} {...provided.droppableProps}>
							{columns.map((column, i) => (
								<InteractiveColumn
									columns={columns}
									setColumns={setColumns}
									key={i}
									column={column}
									index={i}
								/>
							))}
							<CreateColumnModal boardId={board.id}>
								<Segment className={`${styles.createColumn} cancelBtn`}>
									<Icon name="plus" />
									{t('create_column')}
								</Segment>
							</CreateColumnModal>
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
};

export default ColumnsSettingsPage;
