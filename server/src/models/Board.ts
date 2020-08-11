export enum BoardType {
	Scrum = 'Scrum',
	Kanban = 'Kanban'
}

export interface IBoardModel {
	id: string,
	boardType: BoardType,
	name: string,
	location: string,
	createdAt: Date,
	createdBy: {
		id: string,
		firstName: string,
		lastName: string,
		avatar: string
	}
}
