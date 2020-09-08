import React from 'react';
import moment from 'moment';
import styles from './styles.module.scss';
import { Icon, Popup } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ActivityIssue } from 'containers/WorkPage/logic/state';

interface Props {
	issue: ActivityIssue;
}

const WorkOnCard: React.FC<Props> = (props: Props) => {
	const {
		issue: { issueKey, summary, type, project, updatedAt, priority },
	} = props;
	const { t } = useTranslation();
	return (
		<div className={styles.issue}>
			<Popup
				content={`${t('project')}: ${project.name}`}
				trigger={
					<Link to={`/project/${project.id}/issues`}>
						<div className={styles.avatar} style={{ backgroundColor: project.color ?? '#676f74' }}>
							{project.icon ? (
								<img src={project.icon} className={styles.img} alt="avatar" />
							) : (
								<p className={styles.avatarTitle}>{project.name[0]}</p>
							)}
						</div>
					</Link>
				}
			/>
			<Link to={`issue/${issueKey}`} className={styles.content}>
				<div className={styles.mainInfo}>
					<p className={styles.key}>{issueKey}</p>
					<Popup
						content={`Type: ${type.title}`}
						trigger={
							<Icon
								name={type.icon as any}
								color={type.color as any}
								title={type.title}
								className={styles.icon}
							/>
						}
					/>
					<p className={styles.summary}>{summary}</p>
				</div>
				<div className={`${styles.mainInfo} ${styles.hidden}`}>
					{priority && (
						<Popup
							content={`Priority: ${priority.title}`}
							trigger={
								<Icon
									key={`priorityIc-${priority.id}`}
									color={priority.color as any}
									name={priority.icon as any}
								/>
							}
						/>
					)}
					<p className={styles.date}>{moment(updatedAt).format('LLL')}</p>
				</div>
			</Link>
		</div>
	);
};

export default WorkOnCard;
