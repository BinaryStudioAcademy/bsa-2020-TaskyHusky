import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import BurndownChart from 'components/BurndownChart';
import { loadSprintById } from './logic/actions';
import { RootState } from 'typings/rootState';

interface Props {
	sprintId: string;
}

const Report: React.FC<Props> = ({ sprintId }) => {
	const dispatch = useDispatch();
	const { sprint } = useSelector((rootState: RootState) => rootState.report);
	useEffect(() => {
		if (sprintId) {
			dispatch(loadSprintById({ id: sprintId }));
		}
	}, [dispatch, sprintId]);
	return (
		<Container>
			<Container className={styles.breadcrumb}>
				<span>Projects / Project Name / Board name / Report</span>
				<h1>Burndown Chart</h1>
				<span>
					Track the total work remaining and project the likelihood of achieving the sprint goal. This helps
					your team manage its progress and respond accordingly.
				</span>
			</Container>
			<Container className={styles.chartContainer}>
				<span>Sprint Story point</span>
				{sprint && <BurndownChart sprint={sprint} />}
			</Container>
		</Container>
	);
};

export default Report;
