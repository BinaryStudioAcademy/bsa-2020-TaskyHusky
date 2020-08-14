export enum creatingAlgorithms {
	newProject = 'newProject',
	existingProject = 'existingProject',
	savedFilter = 'savedFilter',
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
