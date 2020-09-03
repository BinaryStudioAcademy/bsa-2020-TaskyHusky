import React from 'react';
import Form from './form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import Options from 'components/common/Options';
import { setProjectActions } from './config/projectActions';
import * as generalProjectActions from 'components/ProjectsCommon/logic/actions';

import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';

const ProjectDetails = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const history = useHistory();
	const { projects } = useSelector((rootState: RootState) => rootState.projects);
	const { project: projectData } = useSelector((rootState: RootState) => rootState.project);
	const { id } = projectData;

	const onTrash = () => {
		dispatch(generalProjectActions.startDeletingProject({ id, projects }));
		history.push('/projects');
	};

	return (
		<>
			<div className={styles.header_inner__container}>
				<h1 className={styles.header_inner__title}>{t('details')}</h1>
				<div className={styles.header__options}>
					<Options config={setProjectActions({ id, onTrash })} />
				</div>
			</div>
			<div className={styles.body_inner__container}>
				<Form projectData={projectData} />
			</div>
		</>
	);
};

export default ProjectDetails;
