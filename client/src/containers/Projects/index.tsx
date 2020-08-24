import React, { useState, ChangeEvent, useMemo } from 'react';
import { Input } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import CreateProjectModal from '../CreateProjectModal';
import styles from './styles.module.scss';
import Spinner from 'components/common/Spinner';

import { useTranslation } from 'react-i18next';
import * as generalProjectActions from 'components/ProjectsCommon/logic/actions';
import * as actions from './logic/actions';
import searchResult from 'assets/images/search-result.svg';
import ProjectsTable from './table';

const Projects: React.FC = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { projects, isLoading } = useSelector((rootState: RootState) => rootState.projects);
	const { isDeleted: isProjectDeleted, isLoading: isDeleting } = useSelector(
		(rootState: RootState) => rootState.projectCommon,
	);
	const [searchName, setSearchName] = useState<string>('');

	const filteredProjects = useMemo(() => {
		if (searchName === '') {
			return projects;
		}

		const searchString = new RegExp(searchName, 'i');
		return projects.filter(({ name }) => searchString.test(name));
	}, [searchName, projects]);

	if (isProjectDeleted) {
		dispatch(generalProjectActions.resetProjectDeletingState());
		dispatch(actions.startLoading());
	}

	const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const searchValue = event.target.value;
		setSearchName(searchValue);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.wrapper__title}>
				<h1 className={styles.title}>{t('projects')}</h1>
				<CreateProjectModal />
			</div>
			<div className={[styles.wrapper__filters, styles.filters].join(' ')}>
				<Input icon="search" placeholder={t('search')} onChange={onSearch} value={searchName} />
			</div>
			<div className={styles.wrapper__table}>
				{isDeleting || isLoading ? (
					<Spinner />
				) : (
					<>
						{filteredProjects.length > 0 ? (
							<ProjectsTable projects={filteredProjects} />
						) : (
							<div className={styles.imgWrapper}>
								<div className={styles.content}>
									<img className={styles.img} src={searchResult} alt="No results" />
									<span className={styles.text}>{t('no_projects')}</span>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Projects;
