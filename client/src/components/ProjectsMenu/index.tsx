import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import styles from 'styles/headerDropDown.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CreateProjectModal from 'containers/CreateProjectModal';

export const ProjectsMenu = () => {
	const { t } = useTranslation();

	return (
		<Dropdown text={t('projects')} className={`${styles.media_query} link item`}>
			<Dropdown.Menu className={styles.dropDownMenu}>
				<Dropdown.Header>{t('recent')}</Dropdown.Header>
				<Dropdown.Item>
					<Icon name="folder open" />
					Project #1
				</Dropdown.Item>
				<Dropdown.Item>
					<Icon name="folder open" />
					Project #1
				</Dropdown.Item>
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
