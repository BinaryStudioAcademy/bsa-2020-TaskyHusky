import React, { useEffect } from 'react';
import { Dropdown, Image } from 'semantic-ui-react';
import styles from 'styles/headerDropDown.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CreateProjectModal from 'containers/CreateProjectModal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import { startLoadingRecent } from 'containers/Projects/logic/actions';

export const ProjectsMenu = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const { recent, projects } = useSelector((rootState: RootState) => ({
		recent: rootState.projects.recent,
		projects: rootState.projects.projects,
	}));

	useEffect(() => {
		dispatch(startLoadingRecent());
	}, [dispatch, projects]);

	return (
		<Dropdown text={t('projects')} className={`${styles.media_query} link item`}>
			<Dropdown.Menu className={styles.dropDownMenu}>
				<Dropdown.Header>{t('recent')}</Dropdown.Header>
				{recent.map((project) => (
					<Dropdown.Item
						as="a"
						href={`/project/${project.id}`}
						key={project.id}
						className={styles.list__project_item}
					>
						<Image src={project.icon} className="standartIcon" />
						<span>{project.name}</span>
					</Dropdown.Item>
				))}
				<Dropdown.Divider />
				<Dropdown.Item as={Link} to="/projects">
					{t('view_all_projects')}
				</Dropdown.Item>
				<CreateProjectModal>
					<Dropdown.Item>{t('create_project')}</Dropdown.Item>
				</CreateProjectModal>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default ProjectsMenu;
