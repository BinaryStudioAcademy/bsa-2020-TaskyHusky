import { Team } from '../entity/Team';

export interface UserModel {
	googleId?: string;
	id: string;
	email: string;
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
	teams?: Team[];
	resetPasswordToken?: string | null;
	resetPasswordExpires?: Date | null;
	filtres?: string[];
	projects?: [];
}
