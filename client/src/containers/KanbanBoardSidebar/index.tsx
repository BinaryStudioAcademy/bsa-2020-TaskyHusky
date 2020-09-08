import React, { useState } from 'react';
import sections, { SectionType } from './config/sections';
import { useTranslation } from 'react-i18next';
import { Icon } from 'semantic-ui-react';
import collapseIcon from 'assets/images/double-arrow-left.svg';
import styles from './styles.module.scss';

interface Props {
	onChangeSection: (section: SectionType) => void;
	project: WebApi.Result.BoardProjectsResult;
	currentSection: SectionType;
}

const KanbanBoardSidebar: React.FC<Props> = ({ onChangeSection, project, currentSection }) => {
	const [expanded, setExpanded] = useState<boolean>(true);
	const { t } = useTranslation();

	return (
		<div className={`${styles.sidebar} ${expanded ? styles.expanded : styles.collapsed}`}>
			<div className={styles.sidebarHeader}>
				<img src={project.icon} className={styles.projectAvatar} alt="Project avatar" />
				<div className={styles.sidebarHeaderText}>
					<div className={styles.projectName}>{project.name}</div>
					<div className={styles.projectCategory}>{project.category} project</div>
				</div>
			</div>
			<div className={styles.sidebarBody}>
				{sections.map((section, i) => (
					<div className={styles.sidebarSection} key={i} onClick={() => onChangeSection(section.type)}>
						<span
							className={
								currentSection !== section.type
									? styles.sidebarSectionContent
									: styles.sidebarSectionActive
							}
						>
							<Icon name={section.icon} />
							{t(section.type)}
						</span>
					</div>
				))}
			</div>
			<div
				className={`${styles.collapseIcon} ${expanded ? '' : styles.collapsed}`}
				onClick={() => setExpanded(!expanded)}
			>
				<img src={collapseIcon} />
			</div>
		</div>
	);
};

export default KanbanBoardSidebar;
