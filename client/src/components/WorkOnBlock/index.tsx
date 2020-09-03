import React from 'react';
import { ActivityIssue } from 'containers/WorkPage/logic/state';
import WorkOnCard from 'components/WorkOnCard';

interface Props {
	activityIssues: Array<ActivityIssue>;
}

const WorkOnBlock: React.FC<Props> = (props: Props) => {
	const { activityIssues } = props;
	return (
		<div className="workBlock">
			{activityIssues.map((item) => (
				<WorkOnCard key={item.id} issue={item} />
			))}
		</div>
	);
};

export default WorkOnBlock;
