import React, { useState, useEffect } from 'react';
import { List, Item } from 'semantic-ui-react';
import styles from './styles.module.scss';
import AssigneeAvatar from './AssigneeAvatar/index';
import { useIO } from 'hooks/useIO';

type Props = {
	issues: WebApi.Entities.Issue[];
	noIssuesText: string;
	id?: string;
	boardId?: string;
	isBacklog?: boolean;
};

export const SprintIssues: React.FC<Props> = ({ issues: givenIssues, noIssuesText, isBacklog, id, boardId }: Props) => {
	const [issues, setIssues] = useState<WebApi.Entities.Issue[]>(givenIssues);
	const [mustSetIssues, setMustSetIssues] = useState<boolean>(true);
	const io = useIO(WebApi.IO.Types.Issue);

	useEffect(() => {
		if (mustSetIssues && givenIssues) {
			setIssues(givenIssues);
			setMustSetIssues(false);
		}
	}, [mustSetIssues, givenIssues]);

	if (!io) {
		return null;
	}

	io.on(WebApi.IO.IssueActions.CreateIssue, (newIssue: WebApi.Entities.Issue) => {
		const canAddIssue = isBacklog ? newIssue.board?.id === boardId : newIssue.sprint?.id === id;

		if (canAddIssue) {
			setIssues([...issues, newIssue]);
		}
	});

	io.on(WebApi.IO.IssueActions.UpdateIssue, (id: string, newIssue: WebApi.Entities.Issue) => {
		const index = issues.findIndex((issue) => issue.id === id);

		if (index > -1) {
			const newIssues = [...issues];

			if (!newIssue.sprint || newIssue.sprint.id !== id) {
				newIssues.splice(index, 1);
			} else {
				newIssues[index] = newIssue;
			}

			setIssues(newIssues);
		} else if (newIssue.sprint?.id === id) {
			setIssues([...issues, newIssue]);
		}
	});

	io.on(WebApi.IO.IssueActions.DeleteIssue, (id: string) => {
		const index = issues.findIndex((issue) => issue.id === id);

		if (index > -1) {
			const newIssues = [...issues];
			newIssues.splice(index, 1);
			setIssues(newIssues);
		}
	});

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
