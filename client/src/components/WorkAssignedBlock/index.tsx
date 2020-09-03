import React from 'react';
import WorkIssueCard from 'components/WorkIssueCard';
import styles from './styles.module.scss';

interface Props {
	assignedIssues: Array<{ issueKey: string; id: string; summary: string; type: WebApi.Entities.IssueType }>;
}

const WorkAssignedBlock: React.FC<Props> = (props: Props) => {
	const { assignedIssues } = props;
	return (
		<div className="workBlock">
			<div className={styles.header}>
				<p className={styles.headerIcon}>T</p>
				<p className={styles.headerKey}>Key</p>
				<p className={styles.headerSummary}>Summary</p>
			</div>
			{assignedIssues.map((item) => (
				<WorkIssueCard key={item.id} issueKey={item.issueKey} description={item.summary} type={item.type} />
			))}
		</div>
	);
};

export default WorkAssignedBlock;
