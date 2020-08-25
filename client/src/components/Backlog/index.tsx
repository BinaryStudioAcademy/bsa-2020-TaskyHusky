import React from 'react';
import styles from './backlog.module.scss';
import { List, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import CreateIssueModal from 'containers/CreateIssueModal';
import { RootState } from 'typings/rootState';
import { useSelector } from 'react-redux';
import { SprintIssues as BacklogIssues } from 'components/Sprint/SprintIssues';

interface Props {
	issues: WebApi.Entities.Issue[];
	boardId: string;
}

const Backlog = (props: Props) => {
	const { issues, boardId } = props;
	const { t } = useTranslation();
	const { project, board } = useSelector((rootState: RootState) => rootState.scrumBoard);

	return (
		<>
			<List horizontal className={styles.backlogHeader}>
				<List.Item>
					<List.Content>
						<List.Header className={styles.backlogHeaderTitle}>{t('backlog')}</List.Header>
					</List.Content>
				</List.Item>

				<List.Item>
					<CreateIssueModal projectID={project.id} boardID={board.id}>
						<Button icon="add" className={styles.createIssueButton} title="Create issue" />
					</CreateIssueModal>
				</List.Item>
			</List>

			<BacklogIssues issues={issues} isBacklog boardId={boardId} noIssuesText={t('no_issues_in_backlog')} />
		</>
	);
};

export default Backlog;
