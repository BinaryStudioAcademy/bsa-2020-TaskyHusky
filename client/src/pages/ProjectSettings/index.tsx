import React from 'react';
import DefaultPageWrapper from 'containers/DefaultPageWrapper';
import ProjectSettings from 'containers/ProjectSettings';

const ProjectSettingsPage: React.FC = () => {
	return (
		<DefaultPageWrapper>
			<ProjectSettings />
		</DefaultPageWrapper>
	);
};

export default ProjectSettingsPage;
