import { BoardProjectsResult } from './Result';

export enum BoardType {
	Scrum = 'Scrum',
	Kanban = 'Kanban',
}

export interface IBoardModel {
	id: string;
	boardType: BoardType;
	name: string;
	location: string;
	createdAt: Date;
	projects?: BoardProjectsResult[];
	createdBy: {
		id: string;
		firstName: string;
		lastName: string;
		avatar: string;
	};
}

export interface IReducedBoard {
	id: string;
	name: string;
}

interface CreateBoardColumn {
	columnName: string;
	status: string;
	board: string;
	index?: number;
	isResolutionSet: boolean;
}
