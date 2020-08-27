export interface ProjectsPeopleState {
	isLoading: boolean;
	isAdded: boolean;
	isDeleted: boolean;
	idAction: string;
	people: WebApi.Entities.UserProfile[];
	isPeopleLoading: boolean;
}

export const initialState: ProjectsPeopleState = {
	isLoading: false,
	isAdded: false,
	isDeleted: false,
	idAction: '',
	people: [],
	isPeopleLoading: false,
};
