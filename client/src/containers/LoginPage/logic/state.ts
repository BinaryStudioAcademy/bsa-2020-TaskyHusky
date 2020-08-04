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
}

export interface AuthState {
	jwtToken: string;
	user: User;
}

export const initialState: AuthState = {
	jwtToken: '',
	user: {},
};
