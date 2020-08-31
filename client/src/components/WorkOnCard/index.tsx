import React from 'react';
import styles from './styles.module.scss';
import { Icon } from 'semantic-ui-react';
import projectIcon from 'icons/profile/projectIcon.svg';
import { Link } from 'react-router-dom';

interface Props {
	issueKey: string;
	description: string;
	type: WebApi.Entities.IssueType;
	project: {
		id: string;
		name: string;
		category: string;
	};
	updated: Date;
}

const WorkOnCard: React.FC<Props> = (props: Props) => {
	const { issueKey, description, type, project, updated } = props;
	const date = new Date(updated);
	const parsedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
	return (
		<div className={styles.issue}>
			<div className={styles.avatar}>
				<p className={styles.avatarTitle}>{project.name[0]}</p>
			</div>
			<div className={styles.content}>
				<div className={styles.mainInfo}>
					<p className={styles.key}>{issueKey}</p>
					<p className={styles.summary}>{description}</p>
					<Icon name={type.icon as any} color={type.color as any} title={type.title} />
				</div>
				<div className={styles.mainInfo}>
					<img src={projectIcon} alt="icon" className={styles.icon} />
					<p className={styles.date}>{parsedDate}</p>
					<p className={styles.link}>
						<Link to={`issue/${issueKey}`}>watch</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default WorkOnCard;
