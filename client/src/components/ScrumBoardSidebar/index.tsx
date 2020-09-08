import React, { useState } from 'react';
import i18n from 'i18next';
import { Icon } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { sidebarItems, SETTINGS_SECTION } from './config/scrumSidebarItems';
import collapseIcon from 'assets/images/double-arrow-left.svg';
import { RootState } from 'typings/rootState';
import { useSelector } from 'react-redux';

interface Props {
	board: WebApi.Result.ComposedBoardResult;
	project: WebApi.Result.BoardProjectsResult;
}

const ScrumBoardSidebar: React.FC<Props> = (props) => {
	const { project, board } = props;
	const boardLink = `/board/${board.id}`;
	const { pathname } = useLocation<string>();
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

	const { sprints } = useSelector((rootState: RootState) => rootState.scrumBoard);
	const activeSprint = sprints.find(({ isActive }) => isActive);

	const onCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<aside className={styles.container}>
			<div
				onClick={onCollapse}
				role="button"
				className={classNames(
					styles.collapse_button,
					{ [styles.collapsed__button]: isCollapsed },
					{ [styles.expand__button]: !isCollapsed },
				)}
			>
				<img src={collapseIcon} className={styles.collapse_button__icon} alt="Collapse" />
			</div>
			<div
				className={classNames(
					{ [styles.sidebar__container_collapsed]: isCollapsed },
					styles.sidebar__container,
				)}
			>
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
						{sidebarItems.map(({ section, icon }: any) => {
							let to = `${boardLink}/${section}`;
							if (section === SETTINGS_SECTION.reports && activeSprint) {
								to = `${boardLink}/${section}/${activeSprint.id}`;
							}
							return (
								<Link
									key={section}
									to={to}
									className={[styles.body__link, styles.body__group_item].join(' ')}
								>
									<span
										className={classNames(styles.nav__link_content, {
											[styles.nav__link__active]: pathname.includes(section),
										})}
									>
										<Icon name={icon} />
										{i18n.t(section)}
									</span>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</aside>
	);
};

export default ScrumBoardSidebar;
