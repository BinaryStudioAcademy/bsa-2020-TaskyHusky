import React, { useState, useEffect } from 'react';
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
	sprintID?: string;
	issues: WebApi.Result.IssueResult[];
	allIssues: WebApi.Result.IssueResult[];
	getOnDragEndFunc: (id: string, responder: OnDragEndResponder) => void;
}

const BoardColumn: React.FC<Props> = ({
	column,
	className,
	search,
	boardId,
	sprintID,
	issues: givenIssues,
	allIssues,
	getOnDragEndFunc,
}) => {
	const [issues, setIssues] = useState<WebApi.Result.IssueResult[]>(givenIssues);
	const { t } = useTranslation();

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
				if (sourceId === column.id) {
					const issuesCopy = [...issues];

					issuesCopy
						.filter((filterIssue) => (filterIssue.index ?? 0) > source.index)
						.map((mapIssue) => mapIssue.index as number)
						.forEach(
							(issueIndex) =>
								(issuesCopy[issueIndex].index = (issuesCopy[issueIndex].index as number) - 1),
						);

					issuesCopy.splice(source.index, 1);
					setIssues(issuesCopy);
					console.log('on delete', issues, issuesCopy);
				} else if (destinationId === column.id) {
					const issue = allIssues.find(
						(issue) => (issue.issueKey as string) === cardKey,
					) as WebApi.Result.IssueResult;

					const issuesCopy = [...issues];

					issuesCopy
						.filter((filterIssue) => (filterIssue.index as number) > (destination.index as number))
						.map((mapIssue) => mapIssue.index as number)
						.forEach((index) => (issuesCopy[index].index = (issuesCopy[index].index as number) + 1));

					issuesCopy.splice(destination.index as number, 0, { ...issue, index: destination.index });
					setIssues(issuesCopy);
					console.log('on create', issues, issuesCopy);
				}
			} else if (destinationId === column.id && destination.index !== source.index) {
				const issue = issues.find(
					(issue) => (issue.issueKey as string) === cardKey,
				) as WebApi.Result.IssueResult;

				const issuesCopy = [...issues];
				const movedDown = source.index < destination.index;
				console.log('moved ' + (movedDown ? 'down' : 'up'), issue);

				const condition = movedDown
					? (filteringIssue: WebApi.Result.IssueResult) =>
							(filteringIssue.index as number) > source.index &&
							(filteringIssue.index as number) <= destination.index
					: (filteringIssue: WebApi.Result.IssueResult) =>
							(filteringIssue.index as number) < source.index &&
							(filteringIssue.index as number) >= destination.index;

				const diff = movedDown ? -1 : 1;

				issuesCopy
					.filter(condition)
					.map((mapIssue) => mapIssue.index as number)
					.forEach((index) => (issuesCopy[index].index = (issuesCopy[index].index as number) + diff));

				issuesCopy.splice(destination.index as number, 0, { ...issue, index: destination.index });
				issuesCopy.splice((source.index as number) - 1, 1);
				console.log(issues, issuesCopy);
				setIssues(issuesCopy);
			}
		});
	}, [column.id, getOnDragEndFunc, issues, allIssues]);

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
									? displayIssues.map((issue) => (
											<IssueCard
												issue={issue}
												index={issue.index as number}
												key={issue.issueKey}
											/>
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
