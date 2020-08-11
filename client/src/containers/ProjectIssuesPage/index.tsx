import React, { useState, useEffect } from 'react';
import { getProjectIssues, getProjectById } from 'services/projects.service';
import { Breadcrumb, Header } from 'semantic-ui-react';

interface Props {
	projectId: string;
}

const ProjectIssuesPage: React.FC<Props> = ({ projectId }) => {
	const [issues, setIssues] = useState<WebApi.Result.IssueResult[] | null>(null);
	const [project, setProject] = useState<WebApi.Entities.Projects | null>(null);
	const leftPadded = { marginLeft: 20 };

	useEffect(() => {
		if (!issues) {
			getProjectIssues(projectId).then(setIssues);
		}

		if (!project) {
			getProjectById(projectId).then(setProject);
		}
	}, [issues, project, projectId]);

	if (!project || !issues) {
		return null;
	}

	return (
		<>
			<Header style={leftPadded} as="h2">
				Issues
			</Header>
			<Breadcrumb style={leftPadded}>
				<Breadcrumb.Section link>Projects</Breadcrumb.Section>
				<Breadcrumb.Divider icon="right arrow" />
				<Breadcrumb.Section active>{project.name}</Breadcrumb.Section>
			</Breadcrumb>
		</>
	);
};

export default ProjectIssuesPage;
