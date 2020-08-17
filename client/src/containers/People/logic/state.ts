export interface PeoplePageState {
	teams: WebApi.Entities.Team[];
	people: WebApi.Entities.UserProfile[];
	isLoading: boolean;
}

export const initialState: PeoplePageState = {
	teams: [],
	people: [],
	isLoading: false,
};
