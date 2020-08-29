import React from 'react';
import i18n from 'i18next';
import { Icon } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { sidebarItems } from './config/sidebarItems';

const ProjectSidebar = (project: WebApi.Entities.Projects, ProjectComponent: JSX.Element) => {
	const projectsLink = '/projects';
	const { pathname } = useLocation();

	return (
		<aside className={styles.container}>
			<div className={styles.sidebar__container}>
				<div className={styles.sidebar__header}>
					<div className={styles.header__item}>
						<img className={styles.header__img} src={project.icon} alt="Project avatar" />
						<div className={styles.header__info_container}>
							<span className={styles.header__name}>{project.name}</span>
							<span className={styles.header__type}>Software project</span>
						</div>
					</div>
				</div>
				<div className={styles.sidebar__body}>
					<div className={styles.body__group}>
						{sidebarItems.map(({ section, icon, title }: any) => (
							<Link
								key={section}
								to={`${projectsLink}/${section}/${project.id}`}
								className={[styles.body__link, styles.body__group_item].join(' ')}
							>
								<span
									className={classNames(styles.nav__link_content, {
										[styles.nav__link__active]: pathname.includes(section),
									})}
								>
									<Icon name={icon} />
									{i18n.t(title)}
								</span>
							</Link>
						))}
					</div>
				</div>
			</div>

			<div className={styles.content__container}>{ProjectComponent}</div>
		</aside>
	);
};

export default ProjectSidebar;
