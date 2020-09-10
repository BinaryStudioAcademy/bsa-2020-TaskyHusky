import React, { useState, useEffect } from 'react';
import { getProjectById } from 'services/projects.service';
import { Breadcrumb, Header, Form } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import ProjectIssuesColumn from 'components/ProjectIssuesColumn';
import { getByKey } from 'services/issue.service';
import Board from 'containers/Board';
//import IssuePageInfoColumn from 'components/IssuePageInfoColumn';
//import { convertIssueResultToPartialIssue } from 'helpers/issueResultToPartialIssue';
import KanbanBoardSidebar from 'containers/KanbanBoardSidebar';
import { SectionType } from 'containers/KanbanBoardSidebar/config/sections';
import ColumnsSettingsPage from 'containers/ColumnsSettingsPage';
import IssuePageContent from 'containers/IssuePageContent';

interface Props {
	projectId: string;
	strict?: boolean;
	noSidebar?: boolean;
}

const ProjectIssuesPage: React.FC<Props> = ({ projectId, strict, noSidebar }) => {
	const [sidebarSection, setSidebarSection] = useState<SectionType>(SectionType.issues);
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

	if (project.boards && project.boards.length > 0 && !strict) {
		return <Board boardId={project.boards[0].id} />;
	}

	//const initialIssue = selectedIssue ? convertIssueResultToPartialIssue(selectedIssue) : {};

	let render;

	const renderIssues = (
		<div style={{ paddingTop: 20, height: '100%', display: 'flex' }}>
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
							style={{ ...leftPadded, marginRight: 20, width: 340 }}
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
					<div style={{ marginLeft: 5 }}>
						<IssuePageContent collapsed issue={selectedIssue} />
					</div>
				) : (
					''
				)}
			</div>
		</div>
	);

	if (project.boards && project.boards.length) {
		const renderSettings = <ColumnsSettingsPage boardId={(project.boards ?? [])[0].id} />;
		const renderBoard = <Board boardId={(project.boards ?? [])[0].id} noSidebar />;

		switch (sidebarSection) {
			case SectionType.issues:
				render = renderIssues;
				break;
			case SectionType.board:
				render = renderBoard;
				break;
			case SectionType.settings:
				render = renderSettings;
				break;
			default:
				break;
		}
	} else {
		render = renderIssues;
	}

	return (
		<div style={{ display: 'flex', height: '100%' }}>
			{noSidebar || !project.boards || !project.boards.length ? (
				''
			) : (
				<KanbanBoardSidebar
					currentSection={sidebarSection}
					onChangeSection={setSidebarSection}
					project={project}
				/>
			)}
			<div style={{ width: '80%' }}>
				{noSidebar || (project.boards && project.boards.length) ? renderIssues : render}
			</div>
		</div>
	);
};

export default ProjectIssuesPage;
