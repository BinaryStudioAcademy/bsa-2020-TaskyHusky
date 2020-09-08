import React, { useState, useEffect } from 'react';
import Kanban from './Kanban';
import { getBoardById } from 'services/board.service';
import Scrum from './Scrum';
import Spinner from 'components/common/Spinner';

export interface BoardComponentProps {
	board: WebApi.Result.ComposedBoardResult;
}

export type BoardComponent = ({ board }: BoardComponentProps) => JSX.Element | null;

const getBoardComponent = (type: string): BoardComponent => {
	switch (type) {
		case 'Kanban': {
			return Kanban;
		}
		case 'Scrum': {
			return Scrum;
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
	const [board, setBoard] = useState<WebApi.Result.ComposedBoardResult | undefined>();

	useEffect(() => {
		if (!board) {
			getBoardById(boardId).then(setBoard);
		}
	}, [board, boardId]);

	if (!board) {
		return <Spinner />;
	}

	const BoardComponent = getBoardComponent(board.boardType);
	return <BoardComponent board={board} />;
};

export default Board;
