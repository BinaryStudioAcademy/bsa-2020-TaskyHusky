import React, { useState, useEffect } from 'react';
import { Segment } from 'semantic-ui-react';
import IssueCard from 'components/IssueCard';
import { useTranslation } from 'react-i18next';
import { getProjectIssues } from 'services/projects.service';
import { useIO } from 'hooks/useIO';

interface Props {
	projectId: string;
	onChangeSelectedCard: (key: string | null) => void;
	search: string;
}

interface Dictionary<V> {
	[key: string]: V;
}

const ProjectIssuesColumn: React.FC<Props> = ({ projectId, onChangeSelectedCard, search }) => {
	const [issues, setIssues] = useState<WebApi.Result.IssueResult[]>([]);
	const [mustFetchIssues, setMustFetchIssues] = useState<boolean>(true);
	const issueCardUnselect: Dictionary<() => void> = {};
	const { t } = useTranslation();
	const io = useIO(WebApi.IO.Types.Issue);

	useEffect(() => {
		if (mustFetchIssues) {
			getProjectIssues(projectId).then(setIssues);
			setMustFetchIssues(false);
		}
	}, [projectId, mustFetchIssues]);

	if (mustFetchIssues || !io) {
		return null;
	}

	const displayIssues = issues.filter((issue) =>
		(issue.summary as string).toLowerCase().includes(search.toLowerCase()),
	);

	io.on(WebApi.IO.IssueActions.CreateIssue, (newIssue: WebApi.Result.IssueResult) => {
		setIssues([...issues, newIssue]);
	});

	io.on(WebApi.IO.IssueActions.UpdateIssue, (id: string, newIssue: WebApi.Result.IssueResult) => {
		const index = issues.findIndex((issue) => issue.id === id);
		const newIssues = [...issues];
		newIssues[index] = newIssue;
		setIssues(newIssues);
	});

	io.on(WebApi.IO.IssueActions.DeleteIssue, (id: string) => {
		const index = issues.findIndex((issue) => issue.id === id);
		const newIssues = [...issues];
		newIssues.splice(index, 1);
		setIssues(newIssues);
	});

	return (
		<Segment style={{ backgroundColor: '#EEE', height: '95%', width: 300, marginLeft: 60 }}>
			<div style={{ marginTop: 10, overflowY: 'auto', height: '95%' }}>
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
