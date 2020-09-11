import React, { useState, useEffect, useCallback } from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
import { Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import CreateIssueModal from 'containers/CreateIssueModal';
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
	issues: WebApi.Result.IssueResult[];
	allIssues: WebApi.Result.IssueResult[];
	sprintID?: string;
	issuesGetter?: (getIssueIds: () => string[]) => void;
	getOnDragEndFunc: (id: string, responder: OnDragEndResponder) => void;
}

const BoardColumn: React.FC<Props> = ({
	column,
	className,
	search,
	boardId,
	issues: givenIssues,
	allIssues,
	sprintID,
	issuesGetter,
	getOnDragEndFunc,
}) => {
	const [issues, setIssuesState] = useState<WebApi.Result.IssueResult[]>(givenIssues);
	const { t } = useTranslation();

	const setIssues = useCallback(
		(newIssues: WebApi.Result.IssueResult[]) => {
			if (issuesGetter) {
				issuesGetter(() => newIssues.map((i) => i.id));
			}

			setIssuesState(newIssues);
		},
		[issuesGetter],
	);

	useEffect(() => {
		if (issuesGetter) {
			issuesGetter(() => issues.map((i) => i.id));
		}
	}, [issuesGetter, issues]);

	useIO(WebApi.IO.Types.Issue, (io) => {
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
					const newIssue = allIssues.find((issue) => issue.issueKey === cardKey);

					if (newIssue) {
						const newIssues = [...issues];
						newIssues.splice(destination.index, 0, newIssue);
						setIssues(newIssues);
					}
				} else if (sourceId === column.id) {
					const index = issues.findIndex((issue) => issue.issueKey === cardKey);
					const issuesCopy = [...issues];
					issuesCopy.splice(index, 1);
					setIssues([...issuesCopy]);
				}
			} else if (destinationId === column.id && destination.index !== source.index) {
				const newIssue = allIssues.find((issue) => issue.issueKey === cardKey);

				if (newIssue) {
					const newIssues = [...issues];
					newIssues.splice(source.index, 1);
					newIssues.splice(destination.index, 0, newIssue);
					setIssues(newIssues);
				}
			}
		});
	}, [column.id, getOnDragEndFunc, issues, allIssues, setIssues]);

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
							<CreateIssueModal sprintID={sprintID} boardColumnID={column.id} boardID={boardId}>
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
