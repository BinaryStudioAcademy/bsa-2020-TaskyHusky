import React from 'react';
import { Icon } from 'semantic-ui-react';
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
						<span className={styles.header__name}>NBA</span>
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
						<span className={styles.header__text}>Back to project</span>
					</Link>
				</div>
			</div>
			<div className={styles.sidebar__body}>
				<div className={styles.body__title}>Project settings</div>
				<div className={styles.body__group}>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							Details
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							People
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							Automation
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							Summary
						</Link>
					</div>
				</div>
				<div className={styles.body__group}>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							Issue types
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							Issue layout
						</Link>
					</div>
				</div>
				<div className={styles.body__group}>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							Workflows
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							Screens
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							Fields
						</Link>
					</div>
				</div>
				<div className={styles.body__group}>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							Code
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							Versions
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							Components
						</Link>
					</div>
				</div>
				<div className={styles.body__group}>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							Permissions
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							Issue security
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							Notifications
						</Link>
					</div>
				</div>
				<div className={styles.body__group}>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							Issue collectors
						</Link>
					</div>
				</div>
				<div className={styles.body__group}>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
							Opsgenie
						</Link>
					</div>
					<div className={styles.body__group_item}>
						<Link to={'/'} className={styles.body__link}>
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
