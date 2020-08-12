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

const ProjectIssues: React.FC<Props> = ({ match }) => {
	return (
		<DefaultPageWrapper>
			<ProjectIssuesPage projectId={match.params.id} />
		</DefaultPageWrapper>
	);
};

export default ProjectIssues;
