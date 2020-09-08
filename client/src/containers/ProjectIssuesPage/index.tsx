import React, { useState, useEffect } from 'react';
import { getProjectById } from 'services/projects.service';
import { Breadcrumb, Header, Form } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import ProjectIssuesColumn from 'components/ProjectIssuesColumn';
import { getByKey } from 'services/issue.service';
import Board from 'containers/Board';
import IssuePageInfoColumn from 'components/IssuePageInfoColumn';
import { convertIssueResultToPartialIssue } from 'helpers/issueResultToPartialIssue';
import Spinner from 'components/common/Spinner';

interface Props {
	projectId: string;
	strict?: boolean;
}

const ProjectIssuesPage: React.FC<Props> = ({ projectId, strict }) => {
	const [project, setProject] = useState<WebApi.Entities.Projects | null>(null);
	const [selectedIssueKey, setSelectedIssueKey] = useState<string | null>(null);
	const [selectedIssue, setSelectedIssue] = useState<WebApi.Result.IssueResult | null>(null);
	const [search, setSearch] = useState<string>('');
	const leftPadded = { marginLeft: 60 };
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
		return <Spinner />;
	}

	if (project.boards && project.boards.length > 0 && !strict) {
		return <Board boardId={project.boards[0].id} />;
	}

	const initialIssue = selectedIssue ? convertIssueResultToPartialIssue(selectedIssue) : {};

	return (
		<main style={{ paddingTop: 20, height: '80%', marginBottom: 10, display: 'flex' }}>
			<div>
				<Header style={leftPadded} as="h2">
					{t('issues')}
				</Header>
				<Breadcrumb style={{ ...leftPadded, marginBottom: 20 }}>
					<Breadcrumb.Section href="/projects">{t('projects')}</Breadcrumb.Section>
					<Breadcrumb.Divider>&nbsp;/&nbsp;</Breadcrumb.Divider>
					<Breadcrumb.Section active>{project.name}</Breadcrumb.Section>
				</Breadcrumb>
				<Form>
					<Form.Group>
						<Form.Input
							placeholder={t('search')}
							icon="search"
							value={search}
							onChange={(event, data) => setSearch(data.value)}
							style={{ ...leftPadded, marginRight: 60, width: 300 }}
						/>
					</Form.Group>
				</Form>
				<ProjectIssuesColumn
					onChangeSelectedCard={(key) => {
						setSelectedIssueKey(key);
						setSelectedIssue(null);
					}}
					onDeleteIssue={() => {
						setSelectedIssueKey(null);
						setSelectedIssue(null);
					}}
					search={search}
					projectId={projectId}
				/>
			</div>
			<div className="fill">
				{selectedIssue ? (
					<div style={{ marginLeft: 30 }}>
						<IssuePageInfoColumn asCardInfo issue={selectedIssue} initialIssue={initialIssue} />
					</div>
				) : (
					''
				)}
			</div>
		</main>
	);
};

export default ProjectIssuesPage;
