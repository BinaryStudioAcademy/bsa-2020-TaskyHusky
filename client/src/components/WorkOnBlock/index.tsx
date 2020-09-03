import React from 'react';
import { ActivityIssue } from 'containers/WorkPage/logic/state';
import styles from './styles.module.scss';
import WorkOnCard from 'components/WorkOnCard';

interface Props {
	activityIssues: Array<ActivityIssue>;
}

const WorkOnBlock: React.FC<Props> = (props: Props) => {
	const { activityIssues } = props;
	return (
		<div className={styles.container}>
			{activityIssues.map((item) => (
				<WorkOnCard
					key={item.id}
					issueKey={item.issueKey}
					description={item.summary}
					type={item.type}
					project={item.project}
					updated={item.updatedAt}
				/>
			))}
		</div>
	);
};

export default WorkOnBlock;
