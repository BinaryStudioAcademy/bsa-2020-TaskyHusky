export interface User {
	id: string;
	firstName?: string;
	lastName?: string;
	avatar?: string;
	department?: string;
	timezone?: string;
	organization?: string;
	email: string;
	jobTitle?: string;
	userSettingsId?: string;
	password?: string;
	resetEmailToken?: string;
}

export interface AuthState {
	user: User | null;
	isAuthorized: boolean;
	jwtToken: string;
	profileLoaded?: boolean;
	isEmailInDB: boolean | null;
	loading: boolean;
}

export const initialState: AuthState = {
	user: null,
	isAuthorized: false,
	jwtToken: '',
	isEmailInDB: null,
	loading: false,
};
