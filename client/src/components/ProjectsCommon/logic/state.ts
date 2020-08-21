export interface ProjectGeneralState {
	isLoading: boolean;
	is404Error: boolean;
	isDeleted: boolean;
}

export const initialState: ProjectGeneralState = {
	isLoading: false,
	is404Error: false,
	isDeleted: false,
};
