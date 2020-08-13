export interface ProjectsState {
	projects: WebApi.Entities.Projects[];
	isLoading: boolean;
}

export const initialState: ProjectsState = {
	projects: [],
	isLoading: false,
};
