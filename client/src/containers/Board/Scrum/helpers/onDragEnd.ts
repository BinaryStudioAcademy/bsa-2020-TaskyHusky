import { DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { updateIssue } from 'pages/IssuePage/logic/actions';
import { reorderIssues } from './reorder';

export default ({ destination, source }: DropResult, issuesMap: any, setIssuesMap: any) => {
	const dispatch = useDispatch();
	if (!destination) {
		return;
	}

	const sourceSprintId = source.droppableId;
	const destinationSprintId = destination.droppableId;

	if (sourceSprintId === destinationSprintId) {
		return;
	}

	if (destinationSprintId === 'backlog') {
		dispatch(
			updateIssue({
				id: issuesMap[source.droppableId][source.index].id,
				data: {
					sprint: null,
				},
			}),
		);
	}

	if (destinationSprintId !== 'backlog' && sourceSprintId !== destinationSprintId) {
		dispatch(
			updateIssue({
				id: issuesMap[source.droppableId][source.index].id,
				data: {
					sprint: destinationSprintId,
				},
			}),
		);
	}

	setIssuesMap(reorderIssues(issuesMap, source, destination));
};
