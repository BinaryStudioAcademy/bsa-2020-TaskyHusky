import React from 'react';
import DefaultPageWrapper from 'containers/DefaultPageWrapper';
import ProjectSettings from 'containers/ProjectSettings';
import ProjectPeople from 'containers/ProjectPeople';

const ProjectSettingsPage: React.FC = () => {
	return (
		<DefaultPageWrapper>
			<ProjectSettings>
				<ProjectPeople />
			</ProjectSettings>
		</DefaultPageWrapper>
	);
};

export default ProjectSettingsPage;
