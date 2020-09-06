import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import BurndownChart from 'components/BurndownChart';
import { loadSprintById } from './logic/actions';
import { RootState } from 'typings/rootState';
import Breadcrumbs from 'components/common/Breadcrumbs';
import { setBreadcrumbs, BreadCrumbData } from './config/breadcrumbs';
import { useHistory } from 'react-router-dom';

interface Props {
	sprintId: string;
}

const Report: React.FC<Props> = ({ sprintId }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { sprint } = useSelector((rootState: RootState) => rootState.report);
	console.log(sprint);

	useEffect(() => {
		if (sprintId) {
			dispatch(loadSprintById({ id: sprintId }));
		}
	}, [dispatch, sprintId]);

	const projectDetails: BreadCrumbData = { id: sprint?.project?.id as string, name: sprint?.project?.name as string };
	const boardDetails: BreadCrumbData = { id: sprint?.board?.id as string, name: sprint?.board?.name as string };
	// const sprintReport: BreadCrumbData = { id: sprint?.id as string, name: 'Reports' as string };

	return (
		<>
			{sprint ? (
				<Container>
					<Container className={styles.breadcrumb}>
						<Breadcrumbs
							sections={setBreadcrumbs({ history, projectDetails, boardDetails, reports: true })}
						/>
						<h1>Burndown Chart</h1>
						<span>
							Track the total work remaining and project the likelihood of achieving the sprint goal. This
							helps your team manage its progress and respond accordingly.
						</span>
					</Container>
					{sprint && <BurndownChart sprint={sprint} />}
				</Container>
			) : null}
		</>
	);
};

export default Report;
