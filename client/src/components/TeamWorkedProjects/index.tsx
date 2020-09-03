import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import worksImg from 'assets/images/team-page-works.svg';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type Props = {
	projects?: WebApi.Entities.Projects[];
};

const TeamWorkedProjects = ({ projects }: Props) => {
	const { t } = useTranslation();

	return (
		<>
			<Header as="h3">{t('worked_on')}</Header>
			<div className={styles.workedBlockWrapper}>
				<div className={styles.flexRow}>
					{projects?.length ? (
						projects.map((project): JSX.Element | null => (
							<Link
								target="_blank"
								className={styles.teamProject}
								key={project.id}
								to={`/project/${project.id}/issues`}
							>
								<Header as="h5" className={styles.projectTitle}>
									{project.name}
								</Header>
								<p>
									{t('project_key')}:<span className={styles.teamKey}> {project.key}</span>
								</p>
								<p>
									{t('project_category')}:
									<span className={styles.teamCategory}>{project.category}</span>
								</p>
							</Link>
						))
					) : (
						<>
							<Image src={worksImg} size="small" />
							<div className={styles.workedBlock}>
								<Header as="h4">{t('no_works')}</Header>
								<p className={styles.pDescr}>
									{t('there_are_no_projects_which_have_been_started_yet')}
								</p>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default TeamWorkedProjects;
