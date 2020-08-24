import { Keys } from './actionTypes';
export interface CreateProjectsState {
	isLoading: boolean;
	isProjectCreated: boolean;
	keys: Keys[];
	isError: boolean;
}

export const initialState: CreateProjectsState = {
	isLoading: false,
	isProjectCreated: false,
	keys: [],
	isError: false,
};
