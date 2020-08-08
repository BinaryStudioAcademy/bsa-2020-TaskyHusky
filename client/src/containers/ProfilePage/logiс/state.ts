export interface UserProfileState {
	id?: string;
	email: string;
	password?: string;
	firstName?: string;
	lastName?: string;
	username?: string;
	avatar?: string;
	department?: string;
	location?: string;
	organization?: string;
	jobTitle?: string;
	userSettingsId?: string;
}

export const initialState: UserProfileState = {
	id: '',
	email: '',
	firstName: '',
	lastName: '',
	username: '',
	avatar: '',
	department: '',
	location: '',
	organization: '',
	jobTitle: '',
	userSettingsId: '',
};
