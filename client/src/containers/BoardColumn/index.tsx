import React, { useState, useEffect } from 'react';
import { Segment, Header, Button, Icon } from 'semantic-ui-react';
import { Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import CreateIssueModal from 'containers/CreateIssueModal';
import { getByColumnId, getByKey } from 'services/issue.service';
import IssueCard from 'components/IssueCard';
import { useTranslation } from 'react-i18next';
import { extractIdFormDragDropId } from 'helpers/extractId.helper';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import styles from './styles.module.scss';

interface Props {
	column: WebApi.Result.BoardColumnResult;
	className: string;
	search: string;
	getOnDragEndFunc: (id: string, responder: OnDragEndResponder) => void;
}

type TypeAndPriority = {
	id: string;
	title: string;
	icon: string;
	color: string;
};

const BoardColumn: React.FC<Props> = ({ column, className, search, getOnDragEndFunc }) => {
	const [issues, setIssues] = useState<WebApi.Result.IssueResult[]>([]);
	const [issuesFetched, setIssuesFetched] = useState<boolean>(false);
	const types = useSelector((state: RootState) => state.issues.types);
	const priorities = useSelector((state: RootState) => state.issues.priorities);
	const { t } = useTranslation();

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

	return (
		<div className={className}>
			<Droppable droppableId={`board-column__${column.id}`}>
				{(provided, snapshot) => (
					<Segment style={{ backgroundColor: snapshot.isDraggingOver ? '#CCC' : '#EEE' }} className="fill">
						<Header as="h3" floated="left" className={styles.columnHeader}>
							{column.columnName}
						</Header>
						<CreateIssueModal
							boardColumnID={column.id}
							onClose={(issue) => {
								setIssues([
									...issues,
									{
										...issue,
										id: '',
										type: types.find((type) => issue.type === type.id) as TypeAndPriority,
										priority: priorities.find(
											(priority) => issue.priority === priority.id,
										) as TypeAndPriority,
									},
								]);
							}}
						>
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
