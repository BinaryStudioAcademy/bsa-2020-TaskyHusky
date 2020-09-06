import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import Spinner from 'components/common/Spinner';
import styles from './styles.module.scss';
import { requestGetIssues } from './logic/actions';
import ProfileHeader from 'components/ProfileHeader';
import { useTranslation } from 'react-i18next';
import ManagerWorkBlock from 'components/ManagerWorkBlock';
import ManagerWorkSection from 'components/ManagerWorkSection';

const WorkPage = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const id = useSelector((state: RootState) => state.auth.user?.id) ?? '';
	const { projects, isLoading: projectLoading } = useSelector((rootState: RootState) => rootState.projects);

	const { assignedIssues, recentActivity, isLoading: issueLoading } = useSelector(
		(rootState: RootState) => rootState.userActivity,
	);

	const [modeToShow, setModeToShow] = useState<string>('projects');
	const [sortedProjects, setSortedProjects] = useState<Array<WebApi.Entities.Projects>>([]);

	const changeMode = (mode: string) => {
		setModeToShow(mode);
	};

	useEffect(() => {
		dispatch(requestGetIssues({ id }));
	}, [id, dispatch]);

	useEffect(() => {
		const sortedProjects = projects
			.sort(({ updatedDate: firstDate = '' }, { updatedDate: secondDate = '' }) => {
				return Number(new Date(secondDate)) - Number(new Date(firstDate));
			})
			.slice(0, 6);
		setSortedProjects(sortedProjects);
	}, [projects]);

	return (
		<div className={styles.wrapper}>
			<ProfileHeader title={t('my_work')} />
			{projectLoading || issueLoading ? (
				<Spinner />
			) : (
				<div className={styles.container}>
					<ManagerWorkBlock changeMode={changeMode} modeToShow={modeToShow} />
					<ManagerWorkSection
						projects={sortedProjects}
						assignedIssues={assignedIssues}
						activityIssues={recentActivity}
						modeToShow={modeToShow}
					/>
				</div>
			)}
		</div>
	);
};

export default WorkPage;
