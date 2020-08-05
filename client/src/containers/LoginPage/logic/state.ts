export interface User {
	id?: string;
	firstName?: string;
	lastName?: string;
	avatar?: string;
	department?: string;
	timezone?: string;
	organization?: string;
	email?: string;
	jobTitle?: string;
	userSettingsId?: string;
	password?: string;
	jwtToken?: string;
}

export interface AuthState {
	user: User;
}

export const initialState: AuthState = {
	user: {},
};
