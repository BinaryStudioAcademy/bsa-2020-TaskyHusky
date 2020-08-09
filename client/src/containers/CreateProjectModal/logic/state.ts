export interface CreateProjectsState {
	isLoading: boolean;
	isModalOpened: boolean;
	isProjectCreated: boolean;
}

export const initialState: CreateProjectsState = {
	isLoading: false,
	isModalOpened: false,
	isProjectCreated: false,
};
