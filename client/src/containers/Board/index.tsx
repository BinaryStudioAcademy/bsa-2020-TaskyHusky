import React, { useState, useEffect, useCallback } from 'react';
import Kanban from './Kanban';
import { getBoardById } from 'services/board.service';

export interface BoardComponentProps {
	board: WebApi.Result.ComposedBoardResult;
}

export type BoardComponent = ({ board }: BoardComponentProps) => JSX.Element | null;

const getBoardComponent = (type: string): BoardComponent => {
	switch (type) {
		case 'Kanban': {
			return Kanban;
		}
		default: {
			throw new Error(`Unknown board type: ${type}`);
		}
	}
};

interface Props {
	boardId: string;
}

const Board: React.FC<Props> = ({ boardId }) => {
	const [board, setBoard] = useState<WebApi.Result.ComposedBoardResult | null>(null);

	const refetch = useCallback(() => {
		getBoardById(boardId).then(setBoard);
	}, [boardId]);

	useEffect(() => {
		if (!board) {
			refetch();
		}
	}, [board, boardId, refetch]);

	if (!board) {
		return null;
	}

	const BoardComponent = getBoardComponent(board.boardType);

	return <BoardComponent board={board} />;
};

export default Board;
