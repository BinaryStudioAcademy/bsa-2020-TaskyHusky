export interface UsersState {
	users: WebApi.Entities.UserProfile[];
}

export const initialState: UsersState = {
	users: [],
};
