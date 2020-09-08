import React from 'react';
import sections, { SectionType } from './config/sections';
import { useTranslation } from 'react-i18next';
import { Icon } from 'semantic-ui-react';
import styles from './styles.module.scss';

interface Props {
	onChangeSection: (section: SectionType) => void;
	project: WebApi.Result.BoardProjectsResult;
}

const KanbanBoardSidebar: React.FC<Props> = ({ onChangeSection, project }) => {
	const { t } = useTranslation();

	return (
		<div className={styles.sidebar}>
			<div className={styles.sidebarHeader}>
				<img src={project.icon} className={styles.projectAvatar} alt="Project avatar" />
				<div className={styles.sidebarHeaderText}>
					<div className={styles.projectName}>{project.name}</div>
					<div className={styles.projectCategory}>{project.category} project</div>
				</div>
			</div>
			<div className={styles.sidebarBody}>
				{sections.map((section, i) => (
					<div className={styles.sidebarSection} key={i}>
						<span
							className={`${styles.sidebarSectionContent} ${
								section.defaultActive ? styles.activeSection : ''
							}`}
						>
							<Icon name={section.icon} />
							{t(section.type)}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default KanbanBoardSidebar;
