import React, { useState, useEffect } from 'react';
import { getProjectById } from 'services/projects.service';
import { Breadcrumb, Header } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import ProjectIssuesColumn from 'components/ProjectIssuesColumn';

interface Props {
	projectId: string;
}

const ProjectIssuesPage: React.FC<Props> = ({ projectId }) => {
	const [project, setProject] = useState<WebApi.Entities.Projects | null>(null);
	const leftPadded = { marginLeft: 20 };
	const { t } = useTranslation();

	useEffect(() => {
		if (!project) {
			getProjectById(projectId).then(setProject);
		}
	}, [project, projectId]);

	if (!project) {
		return null;
	}

	return (
		<>
			<Header style={leftPadded} as="h2">
				{t('issues')}
			</Header>
			<Breadcrumb style={leftPadded}>
				<Breadcrumb.Section href="/projects">{t('projects')}</Breadcrumb.Section>
				<Breadcrumb.Divider icon="right arrow" />
				<Breadcrumb.Section active>{project.name}</Breadcrumb.Section>
			</Breadcrumb>
			<ProjectIssuesColumn projectId={projectId} />
		</>
	);
};

export default ProjectIssuesPage;
