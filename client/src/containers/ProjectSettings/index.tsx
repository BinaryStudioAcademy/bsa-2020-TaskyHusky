import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'typings/rootState';
import Breadcrumbs from 'components/common/Breadcrumbs';
import { setBreadcrumbs } from './config/breadcrumbs';
import * as actions from './logic/actions';
import styles from './styles.module.scss';
import ProjectSidebar from 'components/ProjectSidebar';
import Spinner from 'components/common/Spinner';
import * as generalProjectActions from 'components/ProjectsCommon/logic/actions';

interface Props {
	children: JSX.Element;
}

const ProjectSettings = ({ children }: Props) => {
	const { is404Error, isLoading, project: projectData } = useSelector((rootState: RootState) => rootState.project);
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams();
	const { name } = projectData;
	const [isRedirected, setIsRedirected] = useState<boolean>(false);

	const { isDeleted: isProjectDeleted, isLoading: isDeleting } = useSelector(
		(rootState: RootState) => rootState.projectCommon,
	);

	if (is404Error) {
		throw new Error();
	}

	if (isProjectDeleted) {
		dispatch(generalProjectActions.resetProjectDeletingState());
		setIsRedirected(true);
	}

	useEffect(() => {
		dispatch(actions.startGettingProject({ id }));
	}, [id, dispatch]);

	return (
		<>
			{isRedirected ? (
				<Redirect to={'/projects'} />
			) : (
				<>
					{ProjectSidebar(
						projectData,
						<section className={styles.header_inner__container}>
							<div className={styles.header_inner__breadcrumbs}>
								<Breadcrumbs sections={setBreadcrumbs({ history, name })} />
							</div>
							{isLoading || isDeleting ? <Spinner /> : children}
						</section>,
					)}
				</>
			)}
		</>
	);
};

export default ProjectSettings;
