import React, { useState, useEffect } from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
import { Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import CreateIssueModal from 'containers/CreateIssueModal';
import { getByColumnId, getByKey } from 'services/issue.service';
import IssueCard from 'components/IssueCard';
import { useTranslation } from 'react-i18next';
import { extractIdFormDragDropId } from 'helpers/extractId.helper';
import styles from './styles.module.scss';
import { useIO } from 'hooks/useIO';

interface Props {
	boardId: string;
	column: WebApi.Result.BoardColumnResult;
	className: string;
	search: string;
	getOnDragEndFunc: (id: string, responder: OnDragEndResponder) => void;
}

const BoardColumn: React.FC<Props> = ({ column, className, search, boardId, getOnDragEndFunc }) => {
	const [issues, setIssues] = useState<WebApi.Result.IssueResult[]>([]);
	const [issuesFetched, setIssuesFetched] = useState<boolean>(false);
	const { t } = useTranslation();

	useIO(WebApi.IO.Types.Issue, (io) => {
		io.on(WebApi.IO.IssueActions.CreateIssue, (newIssue: WebApi.Result.IssueResult) => {
			if (newIssue.boardColumn?.id === column.id) {
				setIssues([...issues, newIssue]);
			}
		});

		io.on(WebApi.IO.IssueActions.UpdateIssue, (id: string, newIssue: WebApi.Result.IssueResult) => {
			const index = issues.findIndex((issue) => issue.id === id);
			console.log(index, column.columnName);

			if (index > -1) {
				const newIssues = [...issues];
				console.log(!newIssue.boardColumn || newIssue.boardColumn.id !== column.id);

				if (!newIssue.boardColumn || newIssue.boardColumn.id !== column.id) {
					newIssues.splice(index, 1);
				} else {
					newIssues[index] = newIssue;
				}

				setIssues(newIssues);
			} else if (newIssue.boardColumn?.id === column.id) {
				console.log('else if');
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
	});

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
				} else if (sourceId === column.id) {
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
					<Segment
						style={{ backgroundColor: snapshot.isDraggingOver ? '#CCC' : '#EEE', height: 'auto' }}
						className={`fill ${styles.wrapper}`}
					>
						<div
							style={{
								display: 'flex',
								width: '100%',
								justifyContent: 'space-between',
								alignItems: 'center',
								flexGrow: 0,
							}}
						>
							<Header as="h3" className={styles.columnHeader}>
								{column.columnName}
							</Header>
						</div>
						<div className={styles.column__content_container}>
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
								className={styles.issueWrapper}
								style={{ minHeight: 10 }}
							>
								{displayIssues.length > 0
									? displayIssues.map((issue, i) => (
											<IssueCard issue={issue} index={i} key={issue.issueKey} />
									  ))
									: ''}
								{provided.placeholder}
							</div>
						</div>
						<div className={styles.issue__actions}>
							<CreateIssueModal boardColumnID={column.id} boardID={boardId}>
								<button className={styles.createBtn}>
									<Icon name="plus circle" />
									{t('create_issue')}
								</button>
							</CreateIssueModal>
						</div>
					</Segment>
				)}
			</Droppable>
		</div>
	);
};

export default BoardColumn;
