export interface UserState {
	id?: string;
	email: string;
	password?: string;
	firstName?: string;
	lastName?: string;
	avatar?: string;
	department?: string;
	timezone?: string;
	organization?: string;
	jobTitle?: string;
	userSettingsId?: string;
}

export const initialState: UserState = {
	id: '',
	email: '',
	password: '',
	firstName: '',
	lastName: '',
	avatar: '',
	department: '',
	timezone: '',
	organization: '',
	jobTitle: '',
	userSettingsId: '',
};
