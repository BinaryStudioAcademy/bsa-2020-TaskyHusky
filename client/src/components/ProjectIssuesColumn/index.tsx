import React, { useState, useEffect } from 'react';
import { Segment, Button, Icon } from 'semantic-ui-react';
import IssueCard from 'components/IssueCard';
import CreateIssueModal from 'containers/CreateIssueModal';
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
			<CreateIssueModal projectID={projectId} onClose={() => setIssues(null)}>
				<Button floated="right" positive compact>
					<Icon name="plus circle" />
					{t('create_issue')}
				</Button>
			</CreateIssueModal>
			<div style={{ clear: 'both' }} />
			<div style={{ marginTop: 10, overflowY: 'auto', height: '71vh' }}>
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
					: 'No cards'}
			</div>
		</Segment>
	);
};

export default ProjectIssuesColumn;
