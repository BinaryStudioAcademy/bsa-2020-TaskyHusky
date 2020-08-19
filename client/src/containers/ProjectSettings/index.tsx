import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'typings/rootState';
import Breadcrumbs from 'components/common/Breadcrumbs';
import Options from 'components/common/Options';
import { setBreadcrumbs } from './config/breadcrumbs';
import { setProjectActions } from './config/projectActions';
import * as actions from './logic/actions';
import styles from './styles.module.scss';
import ProjectSidebar from 'components/ProjectSidebar';
import Spinner from 'components/common/Spinner';
import Form from './form';

const ProjectSettings = () => {
	const { is404Error, isLoading, project: projectData } = useSelector((rootState: RootState) => rootState.project);
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams();
	const { name } = projectData;
	const [isRedirected, setIsRedirected] = useState<boolean>(false);
	console.log('projectData', projectData.lead);

	if (is404Error) {
		throw new Error();
	}

	useEffect(() => {
		dispatch(actions.startGettingProject({ id }));
	}, [id, dispatch]);

	const onTrash = () => {
		dispatch(actions.startDeletingProject({ id }));
		setIsRedirected(true);
	};
	return (
		<>
			{isRedirected ? (
				<Redirect to={'/projects'} />
			) : (
				<>
					{ProjectSidebar(
						projectData,
						<section>
							<div className={styles.header_inner__container}>
								<div className={styles.header_inner__breadcrumbs}>
									<Breadcrumbs sections={setBreadcrumbs({ history, name })} />
								</div>
								<h1 className={styles.header_inner__title}>{t('details')}</h1>
								<div className={styles.header__options}>
									<Options config={setProjectActions({ id, onTrash })} />
								</div>
							</div>
							<div className={styles.body_inner__container}>
								{isLoading ? <Spinner /> : <Form projectData={projectData} />}
							</div>
						</section>,
					)}
				</>
			)}
		</>
	);
};

export default ProjectSettings;
