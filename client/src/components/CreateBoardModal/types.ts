export enum creatingAlgorithms {
	newProject = 'newProject',
	existingProject = 'existingProject',
	savedFilter = 'savedFilter',
}

export enum boardTypes {
	scrum = 'scrum',
	kanban = 'kanban',
}

export interface IBoard {
	type: boardTypes;
	algorithm: creatingAlgorithms;
	projectName: string;
	projectKey: string;
	projectLead: string;
}
