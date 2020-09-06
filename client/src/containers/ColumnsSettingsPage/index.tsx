import React, { useState, useEffect } from 'react';
import NotFound from 'pages/404';
import { getBoardById } from 'services/board.service';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import Spinner from 'components/common/Spinner';
import { DragDropContext, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import InteractiveColumn from 'containers/InteractiveColumn';
import { useDispatch } from 'react-redux';
import { updateColumn } from 'containers/BoardColumn/logic/actions';

const ColumnsSettingsPage: React.FC = () => {
	const { boardId } = useParams();
	const dispatch = useDispatch();
	const [board, setBoard] = useState<WebApi.Result.ComposedBoardResult | undefined>();
	const [columns, setColumns] = useState<WebApi.Result.BoardColumnResult[]>([]);

	useEffect(() => {
		if (!board) {
			getBoardById(boardId).then((board) => {
				setBoard(board);
				setColumns(board.columns);
			});
		}
	}, [board, boardId]);

	if (!board) {
		return <Spinner />;
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
			<h1>{board.name}</h1>
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
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
};

export default ColumnsSettingsPage;
