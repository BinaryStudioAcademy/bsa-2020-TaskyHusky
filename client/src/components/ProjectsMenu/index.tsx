import React from 'react';
import { Dropdown, Image } from 'semantic-ui-react';
import styles from 'styles/headerDropDown.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CreateProjectModal from 'containers/CreateProjectModal';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';

export const ProjectsMenu = () => {
	const { t } = useTranslation();
	const recent = useSelector((state: RootState) => state.projects.recent);

	return (
		<Dropdown text={t('projects')} className={`${styles.media_query} link item`}>
			<Dropdown.Menu className={styles.dropDownMenu}>
				<Dropdown.Header>{t('recent')}</Dropdown.Header>
				{recent.map((project) => (
					<Dropdown.Item as={Link} to={`/project/${project.id}/issues`} key={project.id}>
						<Image src={project.icon} />
						{project.name}
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
