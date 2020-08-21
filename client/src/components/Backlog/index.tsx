import React from 'react';
import styles from './backlog.module.scss';
import { List, Button, Item } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import CreateIssueModal from 'containers/CreateIssueModal';
import { RootState } from 'typings/rootState';
import { useSelector } from 'react-redux';
import AssigneeAvatar from 'components/Sprint/SprintIssues/AssigneeAvatar';

interface Props {
	issues: WebApi.Entities.Issue[];
}

const Backlog = (props: Props) => {
	const { issues } = props;
	const { t } = useTranslation();
	const { project, board } = useSelector((rootState: RootState) => rootState.scrumBoard);

	const issuesList =
		issues?.length > 0 ? (
			issues.map((issue) => {
				const { type, priority } = issue;

				return (
					<List.Item href={`/issue/${issue.issueKey}`} key={issue.id} className={styles.issueItem}>
						<List.Content className={styles.leftContent}>
							<List.Icon name={type?.icon as any} color={type?.color as any} title={type?.title} />
							<List.Header>{issue.summary}</List.Header>
						</List.Content>

						<List.Content className={styles.rightContent}>
							<AssigneeAvatar user={issue.assigned} />
							<Item className={styles.issueKeyItem}>{issue.issueKey}</Item>
							<List.Icon
								title={priority?.title}
								name={priority?.icon as any}
								color={priority?.color as any}
								className={styles.priorityItem}
							/>
						</List.Content>
					</List.Item>
				);
			})
		) : (
			<List.Item className={styles.emptyIssueItem}>
				<span>{t('no_issues_in_backlog')}</span>
			</List.Item>
		);

	return (
		<>
			<List horizontal className={styles.backlogHeader}>
				<List.Item>
					<List.Content>
						<List.Header className={styles.backlogHeaderTitle}>{t('backlog')}</List.Header>
					</List.Content>
				</List.Item>

				<List.Item>
					<List.Content className={styles.rightContent}>
						<CreateIssueModal projectID={project.id} boardID={board.id}>
							<Button icon="add" className={styles.createIssueButton} title="Create issue" />
						</CreateIssueModal>
					</List.Content>
				</List.Item>
			</List>

			<List celled selection={issues?.length > 0 ? true : false} verticalAlign="middle">
				{issuesList}
			</List>
		</>
	);
};

export default Backlog;
