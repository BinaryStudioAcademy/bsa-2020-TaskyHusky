export interface HeaderState {
	invites: WebApi.Entities.UserProfile[];
}

export const initialState: HeaderState = {
	invites: [],
};
