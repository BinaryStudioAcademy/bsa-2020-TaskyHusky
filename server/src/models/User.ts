export interface UserModel {
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
