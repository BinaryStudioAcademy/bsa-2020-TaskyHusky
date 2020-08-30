import React from 'react';
import { useParams, Redirect } from 'react-router-dom';

import DefaultPageWrapper from 'containers/DefaultPageWrapper';
import ProjectSettings from 'containers/ProjectSettings';
import ProjectDetails from 'containers/ProjectDetails';
import { SETTINGS_SECTION } from 'components/ProjectSidebar/config/sidebarItems';

const ProjectSettingsPage: React.FC = () => {
	const { section } = useParams();
	let renderComponent;

	switch (section) {
		case SETTINGS_SECTION.details:
			renderComponent = <ProjectDetails />;
			break;
		default:
			renderComponent = <Redirect to={'/404'} />;
	}

	return (
		<DefaultPageWrapper isOverflowHidden>
			<ProjectSettings>{renderComponent}</ProjectSettings>
		</DefaultPageWrapper>
	);
};

export default ProjectSettingsPage;
