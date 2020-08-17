import React from 'react';
import WorkProjectBlock from 'components/WorkProjectBlock';

interface Props {
	projects: Array<{
		name: string;
		id: string;
		category?: string;
	}>;
	modeToShow: string;
}

const ManagerWorkSection: React.FC<Props> = (props: Props) => {
	const { projects, modeToShow } = props;
	switch (modeToShow) {
		case 'worked-on':
			return <WorkProjectBlock projects={projects} />;
		case 'assigned':
			return <WorkProjectBlock projects={projects} />;
		case 'starred':
			return <WorkProjectBlock projects={projects} />;
		case 'projects':
		default:
			return <WorkProjectBlock projects={projects} />;
	}
};

export default ManagerWorkSection;
