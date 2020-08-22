import React from 'react';
import i18n from 'i18next';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const ProjectSidebar = (project: WebApi.Entities.Projects, ProjectComponent: JSX.Element) => (
	<div className={styles.container}>
		<div className={styles.sidebar__container}>
			<div className={styles.sidebar__header}>
				<div className={styles.header__item}>
					<img className={styles.header__img} src={project.icon} alt="Project avatar" />
					<div className={styles.header__info_container}>
						<span className={styles.header__name}>{project.name}</span>
						<span className={styles.header__type}>Classic software project</span>
					</div>
				</div>
				<div className={[styles.header__item, styles.header__item_back].join(' ')}>
					<Link to={'/'} className={styles.header__link}>
						<Icon
							className={styles.header__link_icon}
							disabled
							name="arrow alternate circle left"
							size={'large'}
						/>
						<span className={styles.header__text}>{i18n.t('back_to_project')}</span>
					</Link>
				</div>
			</div>
			<div className={styles.sidebar__body}>
				<div className={styles.body__title}>{i18n.t('project_settings')}</div>
				<div className={styles.body__group}>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							{i18n.t('details')}
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							{i18n.t('people')}
						</Link>
					</div>
				</div>
				<div className={styles.body__group}>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							{i18n.t('issue_types')}
						</Link>
					</div>
				</div>

				<div className={styles.body__group}>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							{i18n.t('versions')}
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							{i18n.t('components')}
						</Link>
					</div>
				</div>
				<div className={styles.body__group}>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							{i18n.t('permissions')}
						</Link>
					</div>

					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							{i18n.t('notifications')}
						</Link>
					</div>
				</div>
			</div>
		</div>

		<div className={styles.content__container}>{ProjectComponent}</div>
	</div>
);

export default ProjectSidebar;
