import React from 'react';
import i18n from 'i18next';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const ProjectSidebar = (project: WebApi.Entities.Projects, ProjectComponent: JSX.Element) => {
	const projectsLink = '/projects';
	return (
		<aside className={styles.container}>
			<div className={styles.sidebar__container}>
				<div className={styles.sidebar__header}>
					<div className={styles.header__item}>
						<img className={styles.header__img} src={project.icon} alt="Project avatar" />
						<div className={styles.header__info_container}>
							<span className={styles.header__name}>{project.name}</span>
							<span className={styles.header__type}>Classic software project</span>
						</div>
					</div>
					<Link
						to={`/projects/projectSettings/${project.id}`}
						className={[styles.header__item, styles.header__item_back, styles.header__link].join(' ')}
					>
						<Icon
							className={styles.header__link_icon}
							disabled
							name="arrow alternate circle left"
							size={'large'}
						/>
						<span className={styles.header__text}>{i18n.t('back_to_project')}</span>
					</Link>
				</div>
				<div className={styles.sidebar__body}>
					<p className={styles.body__title}>{i18n.t('project_settings')}</p>

					<div className={styles.body__group}>
						<Link
							to={`${projectsLink}/projectSettings/${project.id}`}
							className={[styles.body__link, styles.body__group_item].join(' ')}
						>
							{i18n.t('details')}
						</Link>
						<Link
							to={`${projectsLink}/projectPeople/${project.id}`}
							className={[styles.body__link, styles.body__group_item].join(' ')}
						>
							{i18n.t('people')}
						</Link>
					</div>
					<div className={styles.body__group}>
						<Link to={'/'} className={[styles.body__link, styles.body__group_item].join(' ')}>
							{i18n.t('issue_types')}
						</Link>
					</div>

					<div className={styles.body__group}>
						<Link to={'/'} className={[styles.body__link, styles.body__group_item].join(' ')}>
							{i18n.t('versions')}
						</Link>
						<Link to={'/'} className={[styles.body__link, styles.body__group_item].join(' ')}>
							{i18n.t('components')}
						</Link>
					</div>
					<div className={styles.body__group}>
						<Link to={'/'} className={[styles.body__link, styles.body__group_item].join(' ')}>
							{i18n.t('permissions')}
						</Link>
						<Link to={'/'} className={[styles.body__link, styles.body__group_item].join(' ')}>
							{i18n.t('notifications')}
						</Link>
					</div>
				</div>
			</div>

			<div className={styles.content__container}>{ProjectComponent}</div>
		</aside>
	);
};

export default ProjectSidebar;
