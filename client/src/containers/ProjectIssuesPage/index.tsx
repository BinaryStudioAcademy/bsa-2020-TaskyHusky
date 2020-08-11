import React, { useState, useEffect } from 'react';
import { getProjectById } from 'services/projects.service';
import { Breadcrumb, Header } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import ProjectIssuesColumn from 'components/ProjectIssuesColumn';
import IssuePageContent from 'containers/IssuePageContent';
import { getByKey } from 'services/issue.service';

interface Props {
	projectId: string;
}

const ProjectIssuesPage: React.FC<Props> = ({ projectId }) => {
	const [project, setProject] = useState<WebApi.Entities.Projects | null>(null);
	const [selectedIssueKey, setSelectedIssueKey] = useState<string | null>(null);
	const [selectedIssue, setSelectedIssue] = useState<WebApi.Result.IssueResult | null>(null);
	const leftPadded = { marginLeft: 20 };
	const { t } = useTranslation();

	useEffect(() => {
		if (!project) {
			getProjectById(projectId).then(setProject);
		}
	}, [project, projectId]);

	useEffect(() => {
		if (selectedIssueKey) {
			getByKey(selectedIssueKey).then(setSelectedIssue);
		}
	}, [selectedIssueKey]);

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
			<div className="fill" style={{ display: 'flex', marginTop: 20 }}>
				<ProjectIssuesColumn
					onChangeSelectedCard={(key) => {
						setSelectedIssueKey(key);
						setSelectedIssue(null);
					}}
					projectId={projectId}
				/>
				{selectedIssue ? (
					<div style={{ minWidth: 600, marginLeft: 30 }}>
						<IssuePageContent issue={selectedIssue} />
					</div>
				) : (
					''
				)}
			</div>
		</>
	);
};

export default ProjectIssuesPage;
