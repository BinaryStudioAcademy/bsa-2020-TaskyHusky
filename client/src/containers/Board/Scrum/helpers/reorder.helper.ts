import { DraggableLocation } from 'react-beautiful-dnd';

// a little function to help us with reordering the result
export const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

export const reorderIssues = (
	issuesMap: { [prop: string]: any[] },
	source: DraggableLocation,
	destination: DraggableLocation,
) => {
	const current = [...issuesMap[source.droppableId]];
	const next = [...issuesMap[destination.droppableId]];
	const target = current[source.index];

	// moving to same list
	if (source.droppableId === destination.droppableId) {
		const reordered = reorder(current, source.index, destination.index);
		return {
			...issuesMap,
			[source.droppableId]: reordered,
		};
	}

	// remove from original
	current.splice(source.index, 1);
	// insert into next
	next.splice(destination.index, 0, target);

	return {
		...issuesMap,
		[source.droppableId]: current,
		[destination.droppableId]: next,
	};
};
