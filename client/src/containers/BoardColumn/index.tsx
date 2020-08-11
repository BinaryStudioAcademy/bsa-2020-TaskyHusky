import React, { useState, useEffect } from 'react';
import { Segment, Header, Button, Icon } from 'semantic-ui-react';
import { Droppable } from 'react-beautiful-dnd';
import CreateIssueModal from 'containers/CreateIssueModal';
import { getByColumnId } from 'services/issue.service';
import IssueCard from 'components/IssueCard';
import { useTranslation } from 'react-i18next';

interface Props {
	column: WebApi.Result.BoardColumnResult;
	className: string;
	search: string;
}

const BoardColumn: React.FC<Props> = ({ column, className, search }) => {
	const [issues, setIssues] = useState<WebApi.Result.IssueResult[] | null>(null);
	const { t } = useTranslation();

	useEffect(() => {
		getByColumnId(column.id, search).then((newIssues) => {
			if (!issues || newIssues.length !== issues.length) {
				setIssues(newIssues);
			}
		});
	});

	if (!issues) {
		return null;
	}

	return (
		<div className={className}>
			<Droppable droppableId={`board-column__${column.id}`}>
				{(provided, snapshot) => (
					<Segment style={{ backgroundColor: snapshot.isDraggingOver ? '#CCC' : '#EEE' }} className="fill">
						<Header as="h3" floated="left">
							{column.columnName}
						</Header>
						<CreateIssueModal boardColumnID={column.id} onClose={() => setIssues(null)}>
							<Button floated="right" positive compact>
								<Icon name="plus circle" />
								{t('create_issue')}
							</Button>
						</CreateIssueModal>
						<div style={{ clear: 'both' }} />
						<div style={{ marginTop: 10 }}>
							<div
								ref={provided.innerRef}
								style={{ overflowY: 'auto', height: '65vh' }}
								{...provided.droppableProps}
							>
								{issues.length > 0
									? issues.map((issue, i) => <IssueCard issue={issue} index={i} key={i} />)
									: 'No cards'}
								{provided.placeholder}
							</div>
						</div>
					</Segment>
				)}
			</Droppable>
		</div>
	);
};

export default BoardColumn;
