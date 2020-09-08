export interface UserProfileState {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	username: string;
	avatar: string;
	department: string;
	address: string;
	lat: number;
	lng: number;
	organization: string;
	jobTitle: string;
	userSettingsId?: string;
	color: string;
	isLoading: boolean;
	googleId: string;
}

export const initialState: UserProfileState = {
	id: '',
	email: '',
	firstName: '',
	lastName: '',
	username: '',
	avatar: '',
	department: '',
	address: '',
	lat: 0,
	lng: 0,
	organization: '',
	jobTitle: '',
	userSettingsId: '',
	isLoading: true,
	color: '',
	googleId: '',
};
