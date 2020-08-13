import React, { useState, useEffect } from 'react';
import { getProjectById } from 'services/projects.service';
import { Breadcrumb, Header, Form, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import ProjectIssuesColumn from 'components/ProjectIssuesColumn';
import IssuePageContent from 'containers/IssuePageContent';
import { getByKey } from 'services/issue.service';
import Board from 'containers/Board';

interface Props {
	projectId: string;
}

const ProjectIssuesPage: React.FC<Props> = ({ projectId }) => {
	const [project, setProject] = useState<WebApi.Entities.Projects | null>(null);
	const [selectedIssueKey, setSelectedIssueKey] = useState<string | null>(null);
	const [selectedIssue, setSelectedIssue] = useState<WebApi.Result.IssueResult | null>(null);
	const [search, setSearch] = useState<string>('');
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

	if (project.boards && project.boards.length > 0) {
		return <Board boardId={project.boards[0].id} />;
	}

	return (
		<>
			<Header style={leftPadded} as="h2">
				{t('issues')}
			</Header>
			<Breadcrumb style={{ ...leftPadded, marginBottom: 20 }}>
				<Breadcrumb.Section href="/projects">{t('projects')}</Breadcrumb.Section>
				<Breadcrumb.Divider icon="right arrow" />
				<Breadcrumb.Section active>{project.name}</Breadcrumb.Section>
			</Breadcrumb>
			<Form>
				<Form.Group>
					<Form.Input
						placeholder={t('search')}
						icon="search"
						value={search}
						onChange={(event, data) => setSearch(data.value)}
						style={{ ...leftPadded, marginRight: 60, maxWidth: 250 }}
					/>
					<Button onClick={() => setSearch('')} secondary>
						{t('clear')}
					</Button>
				</Form.Group>
			</Form>
			<div className="fill" style={{ display: 'flex', marginTop: 20 }}>
				<ProjectIssuesColumn
					onChangeSelectedCard={(key) => {
						setSelectedIssueKey(key);
						setSelectedIssue(null);
					}}
					search={search}
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
