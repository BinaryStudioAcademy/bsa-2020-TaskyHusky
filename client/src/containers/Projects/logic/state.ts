export interface ProjectsState {
	projects: WebApi.Entities.Projects[];
	isLoading: boolean;
	recent: WebApi.Entities.Projects[];
}

export const initialState: ProjectsState = {
	projects: [],
	isLoading: false,
	recent: [],
};
