export interface UserModel {
	id?: string;
	email?: string;
	password?: string;
	lastName?: string;
	firstName?: string;
	username?: string;
	avatar?: string;
	location?: string;
	department?: string;
	organization?: string;
	jobTitle?: string;
	userSettingsId?: string;
	resetPasswordToken: string | null;
	resetPasswordExpires: Date | null;
	teams?: [];
	filtres?: string[];
	projects?: [];
}
