import React from 'react';
import { List, Image, Item } from 'semantic-ui-react';
import styles from './styles.module.scss';

type Props = { issues: WebApi.Entities.Issue[] };

export const SprintIssues: React.FC<Props> = ({ issues }: Props) => {
	const issuesList =
		issues.length > 0 ? (
			issues.map((issue) => {
				const { type, priority } = issue;
				return (
					<List.Item href={`/issue/${issue.issueKey}`} key={issue.id} className={styles.issueItem}>
						<List.Content className={styles.leftContent}>
							<List.Icon name={type?.icon as any} color={type?.color as any} title={type?.title} />
							<List.Header>{issue.summary}</List.Header>
						</List.Content>

						<List.Content className={styles.rightContent}>
							{issue.assigned ? (
								<Image
									avatar
									src={issue.assigned?.avatar}
									title={`Assignee: ${issue.assigned?.firstName} ${issue.assigned?.lastName}`}
								/>
							) : null}
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
				<span>Plan a sprint by creating some issues.</span>
			</List.Item>
		);
	return (
		<List celled selection={issues.length > 0 ? true : false} verticalAlign="middle">
			{issuesList}
		</List>
	);
};

export default SprintIssues;
