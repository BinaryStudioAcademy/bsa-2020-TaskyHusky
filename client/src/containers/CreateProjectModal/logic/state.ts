export interface CreateProjectsState {
	isLoading: boolean;
	isModalOpened: boolean;
}

export const initialState: CreateProjectsState = {
	isLoading: false,
	isModalOpened: false,
};
