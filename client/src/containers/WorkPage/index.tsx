import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import Spinner from 'components/common/Spinner';
import styles from './styles.module.scss';
import ProfileHeader from 'components/ProfileHeader';
import { useTranslation } from 'react-i18next';
import ManagerWorkBlock from 'components/ManagerWorkBlock';
import ManagerWorkSection from 'components/ManagerWorkSection';

const WorkPage = () => {
	const { t } = useTranslation();
	const { projects, isLoading } = useSelector((rootState: RootState) => rootState.projects);
	const [modeToShow, setModeToShow] = useState<string>('projects');
	const changeMode = (mode: string) => {
		setModeToShow(mode);
	};
	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<div className={styles.wrapper}>
					<ProfileHeader title={t('my_work')} />
					<div className={styles.container}>
						<ManagerWorkBlock changeMode={changeMode} modeToShow={modeToShow} />
						<ManagerWorkSection projects={projects} modeToShow={modeToShow} />
					</div>
				</div>
			)}
		</>
	);
};

export default WorkPage;
