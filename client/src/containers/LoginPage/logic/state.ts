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
	user: User;
	isAuthorized: boolean;
	jwtToken: string;
}

export const initialState: AuthState = {
	user: {},
	isAuthorized: false,
	jwtToken: '',
};
