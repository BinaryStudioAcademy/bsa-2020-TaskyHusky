import React from 'react';
import { List, Item } from 'semantic-ui-react';
import styles from './styles.module.scss';
import AssigneeAvatar from './AssigneeAvatar/index';

type Props = { issues: WebApi.Entities.Issue[]; noIssuesText: string };

export const SprintIssues: React.FC<Props> = ({ issues, noIssuesText }: Props) => {
	const issuesList = !!issues?.length ? (
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
			<span>{noIssuesText}</span>
		</List.Item>
	);

	return (
		<List celled selection={!!issues?.length ? true : false} verticalAlign="middle">
			{issuesList}
		</List>
	);
};

export default SprintIssues;
