import React from 'react';
import styles from './styles.module.scss';
import projectIcon from 'icons/profile/projectIcon.svg';
import { ActivityIssue } from 'containers/WorkPage/logic/state';

interface Props {
	item: ActivityIssue;
}

const IssueActivityItem: React.FC<Props> = (props: Props) => {
	const { item } = props;

	return (
		<div className={styles.activityItem}>
			<img src={projectIcon} alt="icon" className={styles.icon} />
			<div className={styles.block}>
				<p className={styles.content}>{item.summary}</p>
				<p className={styles.contentSecondary}>{item.project.category} project</p>
			</div>
		</div>
	);
};

export default IssueActivityItem;
