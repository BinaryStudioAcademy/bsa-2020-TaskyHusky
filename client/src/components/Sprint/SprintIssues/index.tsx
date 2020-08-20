import React from 'react';
import { List, Image, Item } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { getUsername } from 'helpers/getUsername.helper';
import { useTranslation } from 'react-i18next';
import { getInitials } from 'helpers/getInitials.helper';

type Props = { issues: WebApi.Entities.Issue[] };

export const SprintIssues: React.FC<Props> = ({ issues }: Props) => {
	const { t } = useTranslation();

	const showAvatarOrNull = <T extends WebApi.Entities.UserProfile>(userData?: T): JSX.Element | null =>
		userData ? (
			userData.avatar ? (
				<Image avatar src={userData?.avatar} title={`Assignee: ${getUsername(userData)}`} />
			) : (
				<Image avatar className={styles.avatar}>
					{getInitials(userData)}
				</Image>
			)
		) : null;

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
							{showAvatarOrNull(issue.assigned)}
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
				<span>{t('no_issues_in_sprint')}</span>
			</List.Item>
		);

	return (
		<List celled selection={issues?.length > 0 ? true : false} verticalAlign="middle">
			{issuesList}
		</List>
	);
};

export default SprintIssues;
