export const extractIdFormDragDropId = (dragDropId: string) => {
	const partsArray: string[] = dragDropId.split('__');
	return partsArray[1];
};
