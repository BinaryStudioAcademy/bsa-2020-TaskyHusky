import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import BurndownChart from 'components/BurndownChart';
import { loadSprintById, loadSprintIssues } from './logic/actions';
import { RootState } from 'typings/rootState';
import Breadcrumbs from 'components/common/Breadcrumbs';
import { setBreadcrumbs } from './config/breadcrumbs';
import { useHistory } from 'react-router-dom';
import { getBoardById } from 'services/board.service';

interface Props {
	sprintId: string;
}

const Report: React.FC<Props> = ({ sprintId }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { sprint, issues } = useSelector((rootState: RootState) => rootState.report);
	const [board, setBoard] = useState<WebApi.Result.ComposedBoardResult | undefined>();

	const boardId = sprint?.board?.id;
	const project = sprint?.project;

	useEffect(() => {
		if (sprintId) {
			dispatch(loadSprintById({ id: sprintId }));
			dispatch(loadSprintIssues({ id: sprintId }));
		}
	}, [dispatch, sprintId]);

	useEffect(() => {
		if (!board && boardId) {
			getBoardById(boardId).then(setBoard);
		}
	}, [board, boardId]);

	return (
		<>
			{board && project && (
				<>
					<div className={styles.breadcrumb}>
						<Breadcrumbs
							sections={setBreadcrumbs({
								history,
								projectDetails: { id: project.id, name: project.name },
								boardDetails: { id: board.id, name: board.name },
								reports: true,
							})}
						/>
						<h1>Burndown Chart</h1>
						<span>
							Track the total work remaining and project the likelihood of achieving the sprint goal. This
							helps your team manage its progress and respond accordingly.
						</span>
					</div>
					{sprint && <BurndownChart sprint={sprint} issues={issues} />}
				</>
			)}
		</>
	);
};

export default Report;
