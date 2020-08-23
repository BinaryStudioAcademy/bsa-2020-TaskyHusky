import React, { useState, useEffect } from 'react';
import { Segment, Header, Button, Icon } from 'semantic-ui-react';
import { Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import CreateIssueModal from 'containers/CreateIssueModal';
import { getByColumnId, getByKey } from 'services/issue.service';
import IssueCard from 'components/IssueCard';
import { useTranslation } from 'react-i18next';
import { extractIdFormDragDropId } from 'helpers/extractId.helper';
import styles from './styles.module.scss';
import { useIO } from 'hooks/useIO';

interface Props {
	column: WebApi.Result.BoardColumnResult;
	className: string;
	search: string;
	getOnDragEndFunc: (id: string, responder: OnDragEndResponder) => void;
}

const BoardColumn: React.FC<Props> = ({ column, className, search, getOnDragEndFunc }) => {
	const [issues, setIssues] = useState<WebApi.Result.IssueResult[]>([]);
	const [issuesFetched, setIssuesFetched] = useState<boolean>(false);
	const { t } = useTranslation();
	const io = useIO(WebApi.IO.Types.Issue);

	useEffect(() => {
		getOnDragEndFunc(column.id, (event) => {
			const { destination, source, draggableId } = event;

			if (!destination) {
				return;
			}

			const destinationId = extractIdFormDragDropId(destination.droppableId);
			const sourceId = extractIdFormDragDropId(source.droppableId);
			const cardKey = extractIdFormDragDropId(draggableId);

			if (destinationId !== sourceId) {
				if (destinationId === column.id) {
					getByKey(cardKey).then((issue) => setIssues([...issues, issue]));
				} else {
					const index = issues.findIndex((issue) => issue.issueKey === cardKey);
					const issuesCopy = [...issues];
					issuesCopy.splice(index, 1);
					setIssues([...issuesCopy]);
				}
			}
		});
	}, [column.id, getOnDragEndFunc, issues]);

	useEffect(() => {
		if (!issuesFetched) {
			getByColumnId(column.id).then(setIssues);
			setIssuesFetched(true);
		}
	}, [column.id, issuesFetched]);

	const displayIssues = issues.filter((issue) =>
		(issue.summary as string).toLowerCase().includes(search.toLowerCase()),
	);

	if (!io) {
		return null;
	}

	io.on(WebApi.IO.IssueActions.CreateIssue, (newIssue: WebApi.Result.IssueResult) => {
		if (newIssue.boardColumn?.id === column.id) {
			setIssues([...issues, newIssue]);
		}
	});

	io.on(WebApi.IO.IssueActions.UpdateIssue, (id: string, newIssue: WebApi.Result.IssueResult) => {
		const index = issues.findIndex((issue) => issue.id === id);

		if (index > -1) {
			const newIssues = [...issues];

			if (!newIssue.boardColumn || newIssue.boardColumn.id !== column.id) {
				newIssues.splice(index, 1);
			} else {
				newIssues[index] = newIssue;
			}

			setIssues(newIssues);
		} else if (newIssue.boardColumn?.id === column.id) {
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

	return (
		<div className={className}>
			<Droppable droppableId={`board-column__${column.id}`}>
				{(provided, snapshot) => (
					<Segment style={{ backgroundColor: snapshot.isDraggingOver ? '#CCC' : '#EEE' }} className="fill">
						<Header as="h3" floated="left" className={styles.columnHeader}>
							{column.columnName}
						</Header>
						<CreateIssueModal boardColumnID={column.id}>
							<Button floated="right" compact>
								<Icon name="plus circle" />
								{t('create_issue')}
							</Button>
						</CreateIssueModal>
						<div style={{ clear: 'both' }} />
						<div style={{ marginTop: 10 }}>
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
								style={{ overflowY: 'auto', height: '100%' }}
							>
								{displayIssues.length > 0
									? displayIssues.map((issue, i) => (
											<IssueCard issue={issue} index={i} key={issue.issueKey} />
									  ))
									: t('no_cards')}
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
