import React from 'react';
import styles from './styles.module.scss';
import projectIcon from 'icons/profile/projectIcon.svg';

interface Props {
	issueKey: string;
	description: string;
}

const WorkIssueCard: React.FC<Props> = (props: Props) => {
	const { issueKey, description } = props;
	return (
		<div className={styles.issue}>
			<img src={projectIcon} alt="icon" className={styles.icon} />
			<p className={styles.key}>{issueKey}</p>
			<p className={styles.summary}>{description}</p>
		</div>
	);
};

export default WorkIssueCard;
