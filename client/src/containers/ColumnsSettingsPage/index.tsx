import React, { useState, useEffect } from 'react';
import NotFound from 'pages/404';
import { getBoardById } from 'services/board.service';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import Spinner from 'components/common/Spinner';

const ColumnsSettingsPage: React.FC = () => {
	const { boardId } = useParams();
	const [board, setBoard] = useState<WebApi.Result.ComposedBoardResult | undefined>();

	useEffect(() => {
		if (!board) {
			getBoardById(boardId).then(setBoard);
		}
	}, [board, boardId]);

	if (!board) {
		return <Spinner />;
	}

	if (board.boardType !== 'Kanban') {
		return <NotFound />;
	}

	return (
		<div className={styles.wrapper}>
			<h1>{board.name}</h1>
		</div>
	);
};

export default ColumnsSettingsPage;
