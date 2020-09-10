import React, { useState, useEffect } from 'react';
import { Segment } from 'semantic-ui-react';
import IssueCard from 'components/IssueCard';
import { useTranslation } from 'react-i18next';
import { getProjectIssues } from 'services/projects.service';
import { useIO } from 'hooks/useIO';
import Spinner from 'components/common/Spinner';

interface Props {
	projectId: string;
	onChangeSelectedCard: (key: string | null) => void;
	onDeleteIssue?: () => void;
	search: string;
}

interface Dictionary<V> {
	[key: string]: V;
}

const ProjectIssuesColumn: React.FC<Props> = ({
	projectId,
	onChangeSelectedCard,
	search,
	onDeleteIssue = () => {},
}) => {
	const [issues, setIssues] = useState<WebApi.Result.IssueResult[]>([]);
	const [mustFetchIssues, setMustFetchIssues] = useState<boolean>(true);
	const issueCardUnselect: Dictionary<() => void> = {};
	const { t } = useTranslation();

	useIO(WebApi.IO.Types.Issue, (io) => {
		io.on(WebApi.IO.IssueActions.CreateIssue, (newIssue: WebApi.Result.IssueResult) => {
			if (issues[0] ? newIssue.project?.id === issues[0].project?.id : true) {
				setIssues([...issues, newIssue]);
			}
		});

		io.on(WebApi.IO.IssueActions.UpdateIssue, (id: string, newIssue: WebApi.Result.IssueResult) => {
			const index = issues.findIndex((issue) => issue.id === id);

			if (index > -1) {
				const newIssues = [...issues];

				if (!newIssue.project || newIssue.project?.id !== projectId) {
					newIssues.splice(index, 1);
				} else {
					newIssues[index] = newIssue;
				}

				setIssues(newIssues);
			}
		});

		io.on(WebApi.IO.IssueActions.DeleteIssue, (id: string) => {
			const index = issues.findIndex((issue) => issue.id === id);

			if (index > -1) {
				onDeleteIssue();
				const newIssues = [...issues];
				newIssues.splice(index, 1);
				setIssues(newIssues);
			}
		});
	});

	useEffect(() => {
		if (mustFetchIssues) {
			getProjectIssues(projectId).then((issues) => {
				setIssues(issues);

				if (issues.length) {
					onChangeSelectedCard(issues[0].issueKey as string);
				}
			});

			setMustFetchIssues(false);
		}
	}, [projectId, mustFetchIssues, onChangeSelectedCard]);

	if (mustFetchIssues) {
		return <Spinner />;
	}

	const displayIssues = issues.filter((issue) =>
		(issue.summary as string).toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<Segment
			style={{
				backgroundColor: '#EEE',
				height: 'calc(100vh - 250px)',
				width: 340,
				marginLeft: 20,
				overflowY: 'auto',
			}}
		>
			<div style={{ marginTop: 10, height: '95%' }}>
				{displayIssues.length > 0
					? displayIssues.map((issue, i) => (
							<IssueCard
								onSelectChange={(event) => {
									if (event.selected) {
										onChangeSelectedCard(event.key);
									} else {
										onChangeSelectedCard(null);
									}

									for (const key in issueCardUnselect) {
										if (key !== event.key) {
											issueCardUnselect[key]();
										}
									}
								}}
								getUnselect={(event) => (issueCardUnselect[event.key] = event.unselect)}
								defaultSelected={i === 0}
								selectable
								noRedirect
								noDrag
								issue={issue}
								index={i}
								key={i}
							/>
					  ))
					: t('no_cards')}
			</div>
		</Segment>
	);
};

export default ProjectIssuesColumn;
