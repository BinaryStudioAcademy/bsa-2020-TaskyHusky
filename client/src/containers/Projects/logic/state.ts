export type Project = {
	id: string;
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
	isLoading: boolean;
}

export const initialState: ProjectsState = {
	projects: [],
	isLoading: false,
};
