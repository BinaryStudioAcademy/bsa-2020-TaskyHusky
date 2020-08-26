import React from 'react';
import DefaultPageWrapper from 'containers/DefaultPageWrapper';
import ProjectSettings from 'containers/ProjectSettings';
import ProjectDetails from 'containers/ProjectDetails';

const ProjectSettingsPage: React.FC = () => {
	return (
		<DefaultPageWrapper>
			<ProjectSettings>
				<ProjectDetails />
			</ProjectSettings>
		</DefaultPageWrapper>
	);
};

export default ProjectSettingsPage;
