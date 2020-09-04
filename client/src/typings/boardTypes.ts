export enum creatingAlgorithms {
	existingProject = 'existingProject',
}

export enum boardTypes {
	scrum = 'Scrum',
	kanban = 'Kanban',
}

export interface IBoard {
	boardType: boardTypes;
	algorithm: creatingAlgorithms;
	projects: Array<string>;
	name: string;
	admin?: string;
}
