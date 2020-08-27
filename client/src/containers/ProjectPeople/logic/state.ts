export interface ProjectsPeopleState {
	isLoading: boolean;
	idAction: string;
	people: WebApi.Entities.UserProfile[];
	isPeopleLoading: boolean;
}

export const initialState: ProjectsPeopleState = {
	isLoading: false,
	idAction: '',
	people: [],
	isPeopleLoading: false,
};
