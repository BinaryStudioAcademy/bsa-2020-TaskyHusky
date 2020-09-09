import React from 'react';
import ProjectIssuesPage from 'containers/ProjectIssuesPage';
import DefaultPageWrapper from 'containers/DefaultPageWrapper';

interface Props {
	match: {
		params: {
			id: string;
		};
	};
}

const ProjectIssuesStrict: React.FC<Props> = ({ match }) => {
	return (
		<DefaultPageWrapper>
			<ProjectIssuesPage projectId={match.params.id} strict />
		</DefaultPageWrapper>
	);
};

export default ProjectIssuesStrict;
