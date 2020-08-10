import React from 'react';
import { Icon } from 'semantic-ui-react';
import i18n from 'i18next';

import { Link } from 'react-router-dom';
import mockAvatar from 'assets/images/projectAvatars/viewavatar.svg';
import styles from './styles.module.scss';

const ProjectSidebar = (ProjectComponent: any) => (
	<div className={styles.container}>
		<div className={styles.sidebar__container}>
			<div className={styles.sidebar__header}>
				<div className={styles.header__item}>
					<img className={styles.header__img} src={mockAvatar} alt="Project avatar" />
					<div className={styles.header__info_container}>
						<span className={styles.header__name}>Project name</span>
						<span className={styles.header__type}>Classic software project</span>
					</div>
				</div>
				<div className={styles.header__item}>
					<Link to={'/'} className={styles.header__link}>
						<Icon
							className={styles.header__link_icon}
							disabled
							name="arrow alternate circle left"
							size={'large'}
						/>
						<span className={styles.header__text}>Back to project</span>
					</Link>
				</div>
			</div>
			<div className={styles.sidebar__body}>
				<div className={styles.body__title}>Project settings</div>
				<div className={styles.body__group}>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__group_item}>
							Details
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__group_item}>
							People
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__group_item}>
							Automation
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__group_item}>
							Summary
						</Link>
					</div>
				</div>
				<div className={styles.body__group}>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__group_item}>
							Issue types
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__group_item}>
							Issue layout
						</Link>
					</div>
				</div>
				<div className={styles.body__group}>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__group_item}>
							Workflows
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__group_item}>
							Screens
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__group_item}>
							Fields
						</Link>
					</div>
				</div>
				<div className={styles.body__group}>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__group_item}>
							Code
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__group_item}>
							Versions
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__group_item}>
							Components
						</Link>
					</div>
				</div>
				<div className={styles.body__group}>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__group_item}>
							Permissions
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__group_item}>
							Issue security
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__group_item}>
							Notifications
						</Link>
					</div>
				</div>
				<div className={styles.body__group}>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__group_item}>
							Issue collectors
						</Link>
					</div>
				</div>
				<div className={styles.body__group}>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__group_item}>
							Opsgenie
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__group_item}>
							Development tools
						</Link>
					</div>
				</div>
			</div>
		</div>

		<div className={styles.content__container}>{ProjectComponent}</div>
	</div>
);

export default ProjectSidebar;
