import React, { useState, useEffect } from 'react';
import { Segment } from 'semantic-ui-react';
import IssueCard from 'components/IssueCard';
import { useTranslation } from 'react-i18next';
import { getProjectIssues } from 'services/projects.service';

interface Props {
	projectId: string;
	onChangeSelectedCard: (key: string | null) => void;
	search: string;
}

interface Dictionary<V> {
	[key: string]: V;
}

const ProjectIssuesColumn: React.FC<Props> = ({ projectId, onChangeSelectedCard, search }) => {
	const [issues, setIssues] = useState<WebApi.Result.IssueResult[] | null>(null);
	const issueCardUnselect: Dictionary<() => void> = {};
	const { t } = useTranslation();

	useEffect(() => {
		if (!issues) {
			getProjectIssues(projectId).then(setIssues);
		}
	}, [projectId, issues]);

	if (!issues) {
		return null;
	}

	const displayIssues = issues.filter((issue) =>
		(issue.summary as string).toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<Segment style={{ backgroundColor: '#EEE', height: '95%', width: 300, marginLeft: 20 }}>
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
