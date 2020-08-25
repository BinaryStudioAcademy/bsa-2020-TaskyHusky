export interface ProjectsPeopleState {
	isLoading: boolean;
	isAdded: boolean;
	isDeleted: boolean;
	idAction: string;
}

export const initialState: ProjectsPeopleState = {
	isLoading: false,
	isAdded: false,
	isDeleted: false,
	idAction: '',
};
