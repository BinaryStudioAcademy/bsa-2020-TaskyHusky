import React from 'react';
import WorkProjectBlock from 'components/WorkProjectBlock';
import WorkAssignedBlock from 'components/WorkAssignedBlock';
import WorkOnBlock from 'components/WorkOnBlock';
import { ActivityIssue } from 'containers/WorkPage/logic/state';

interface Props {
	projects: Array<WebApi.Entities.Projects>;
	assignedIssues: Array<ActivityIssue>;
	activityIssues: Array<ActivityIssue>;
	modeToShow: string;
}

const ManagerWorkSection: React.FC<Props> = (props: Props) => {
	const { projects, modeToShow, assignedIssues, activityIssues } = props;
	switch (modeToShow) {
		case 'worked-on':
			return <WorkOnBlock activityIssues={activityIssues} />;
		case 'assigned':
			return <WorkAssignedBlock assignedIssues={assignedIssues} />;
		case 'projects':
		default:
			return <WorkProjectBlock projects={projects} />;
	}
};

export default ManagerWorkSection;
