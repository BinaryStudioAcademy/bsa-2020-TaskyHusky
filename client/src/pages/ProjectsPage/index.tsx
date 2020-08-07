import React from 'react';
import DefaultPageWrapper from 'containers/DefaultPageWrapper';
import Projects from 'containers/Projects';

const ProjectsPage: React.FC = () => {
	return (
		<DefaultPageWrapper>
			<Projects />
		</DefaultPageWrapper>
	);
};

export default ProjectsPage;
