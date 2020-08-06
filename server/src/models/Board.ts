export enum BoardType {
	Scrum = 'Scrum',
	NextGen = 'Next-gen',
	Kanban = 'Kanban'
}

export interface IBoardModel {
	id: string,
	boardType: BoardType,
	name: string,
	location: string,
	createdBy: {
		id: string,
		firstName: string,
		lastName: string,
		avatar: string
	}
}
