import React, { useState, useEffect } from 'react';
import { getProjectById } from 'services/projects.service';
import { Breadcrumb, Header, Form } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import ProjectIssuesColumn from 'components/ProjectIssuesColumn';
import IssuePageContent from 'containers/IssuePageContent';
import { getByKey } from 'services/issue.service';
import Board from 'containers/Board';
import styles from './styles.module.scss';

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
		<main style={{ paddingTop: 20, height: '80%', marginBottom: 10 }}>
			<Header style={leftPadded} as="h2">
				{t('issues')}
			</Header>
			<Breadcrumb style={{ ...leftPadded, marginBottom: 20 }}>
				<Breadcrumb.Section href="/projects">
					<span className={styles.link}>{t('projects')}</span>
				</Breadcrumb.Section>
				<Breadcrumb.Divider />
				<Breadcrumb.Section link>
					<span className={styles.link}>{project.name}</span>
				</Breadcrumb.Section>
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
			<div className="fill" style={{ display: 'flex', marginTop: 20, overflowY: 'hidden' }}>
				<ProjectIssuesColumn
					onChangeSelectedCard={(key) => {
						setSelectedIssueKey(key);
						setSelectedIssue(null);
					}}
					search={search}
					projectId={projectId}
				/>
				<div style={{ position: 'absolute', top: 70, right: 10, width: '80%' }}>
					{selectedIssue ? (
						<div style={{ width: '80%', marginLeft: 30 }}>
							<IssuePageContent issue={selectedIssue} forceCommentsLeft />
						</div>
					) : (
						''
					)}
				</div>
			</div>
		</main>
	);
};

export default ProjectIssuesPage;
