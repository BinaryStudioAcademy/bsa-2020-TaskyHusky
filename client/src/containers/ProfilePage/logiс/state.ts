export interface UserProfileState {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	username: string;
	avatar: string;
	department: string;
	location: string;
	organization: string;
	jobTitle: string;
	userSettingsId?: string;
	color: string;
	isLoading: boolean;
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
	isLoading: true,
	color: '',
};
