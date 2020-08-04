export interface FilterState {
	filters: WebApi.Entities.Filter[];
}

export const initialState: FilterState = {
	filters: [
		{ id: '1', stared: true, ownerId: '1', name: 'Done Filter' },
		{ id: '2', stared: false, ownerId: '2', name: 'In Progress Filter' },
	],
};
