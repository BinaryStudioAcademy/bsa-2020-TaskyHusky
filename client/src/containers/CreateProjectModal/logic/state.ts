import { Keys } from './actionTypes';
export interface CreateProjectsState {
	isLoading: boolean;
	isModalOpened: boolean;
	isProjectCreated: boolean;
	keys: Keys[];
	isError: boolean;
}

export const initialState: CreateProjectsState = {
	isLoading: false,
	isModalOpened: false,
	isProjectCreated: false,
	keys: [],
	isError: false,
};
