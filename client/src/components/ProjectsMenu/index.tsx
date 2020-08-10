import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import styles from 'styles/headerDropDown.module.scss';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as actions from 'containers/CreateProjectModal/logic/actions';

export const ProjectsMenu = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const onCreateProject = () => {
		dispatch(actions.openModal());
	};

	return (
		<Dropdown text={t('projects')} className="link item">
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
				<Dropdown.Item as="a" href="/projects">
					{t('view_all_projects')}
				</Dropdown.Item>
				<Dropdown.Item onClick={onCreateProject}>{t('create_project')}</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default ProjectsMenu;
