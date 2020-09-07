import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'typings/rootState';
import Breadcrumbs from 'components/common/Breadcrumbs';
import { setBreadcrumbs } from './config/breadcrumbs';
import * as actions from './logic/actions';
import styles from './styles.module.scss';
import ProjectSidebar from 'components/ProjectSidebar';
import Spinner from 'components/common/Spinner';

interface Props {
	children: JSX.Element;
}

const ProjectSettings = ({ children }: Props) => {
	const { is404Error, isLoading, project: projectData } = useSelector((rootState: RootState) => rootState.project);
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams();
	const { name } = projectData;

	const { isLoading: isDeleting } = useSelector((rootState: RootState) => rootState.projectCommon);

	if (is404Error) {
		throw new Error();
	}

	useEffect(() => {
		dispatch(actions.startGettingProject({ id }));
	}, [id, dispatch]);

	return (
		<div className={styles.container}>
			<ProjectSidebar project={projectData} />
			<section className={styles.header_inner__container}>
				<div className={styles.header_inner__breadcrumbs}>
					<Breadcrumbs sections={setBreadcrumbs({ history, name, id })} />
				</div>
				{isLoading || isDeleting ? <Spinner /> : children}
			</section>
		</div>
	);
};

export default ProjectSettings;
