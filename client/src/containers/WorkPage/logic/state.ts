export interface UserActivityState {
	issues: Array<Partial<WebApi.Entities.Issue>>;
	isLoading: boolean;
}

export const initialState: UserActivityState = {
	issues: [],
	isLoading: true,
};
