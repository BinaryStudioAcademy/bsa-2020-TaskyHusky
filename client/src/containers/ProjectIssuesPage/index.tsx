import React, { useState, useEffect } from 'react';
import { getProjectById } from 'services/projects.service';
import { Breadcrumb, Header, Form } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import ProjectIssuesColumn from 'components/ProjectIssuesColumn';
import { getByKey } from 'services/issue.service';
import Board from 'containers/Board';
import styles from './styles.module.scss';
import IssuePageInfoColumn from 'components/IssuePageInfoColumn';

interface Props {
	projectId: string;
}

const ProjectIssuesPage: React.FC<Props> = ({ projectId }) => {
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
		return null;
	}

	if (project.boards && project.boards.length > 0) {
		return <Board boardId={project.boards[0].id} />;
	}

	const initialIssue = selectedIssue
		? {
				...selectedIssue,
				type: selectedIssue.type.id,
				priority: selectedIssue.priority.id,
		  }
		: {
				id: '',
				type: '',
				priority: '',
				creator: {
					id: '',
				},
		  };

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
				<div>
					{selectedIssue ? (
						<div style={{ marginLeft: 30 }}>
							<IssuePageInfoColumn
								leftAligned
								withDescrtiption
								issue={selectedIssue}
								initialIssue={initialIssue}
							/>
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
