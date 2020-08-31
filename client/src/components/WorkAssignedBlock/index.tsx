import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import WorkIssueCard from 'components/WorkIssueCard';
import { requestGetUserIssues } from 'services/user.service';
import styles from './styles.module.scss';

const WorkAssignedBlock: React.FC = () => {
	const id = useSelector((state: RootState) => state.auth.user?.id) ?? '';
	const [issues, setIssues] = useState<
		Array<{ issueKey: string; id: string; summary: string; type: WebApi.Entities.IssueType }>
	>([]);
	const getIssues = async (id: string): Promise<void> => {
		const issues = await requestGetUserIssues(id);
		setIssues(issues);
	};
	useEffect(() => {
		getIssues(id);
	}, [id]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<p className={styles.headerIcon}>T</p>
				<p className={styles.headerKey}>Key</p>
				<p className={styles.headerSummary}>Summary</p>
			</div>
			{issues.map((item) => (
				<WorkIssueCard key={item.id} issueKey={item.issueKey} description={item.summary} type={item.type} />
			))}
		</div>
	);
};

export default WorkAssignedBlock;
