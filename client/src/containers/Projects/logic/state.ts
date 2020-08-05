export type Project = {
	projectID: string;
	name: string;
	key: string;
	projectType: string;
	category: string;
	defaultAssigneeID: string;
	leadID: string;
	creatorID: string;
};

export interface ProjectsState {
	projects: Project[];
}

export const initialState: ProjectsState = {
	projects: [],
};
