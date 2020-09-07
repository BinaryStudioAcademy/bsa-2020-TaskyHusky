import { Team } from '../entity/Team';

export enum jobTitle {
	dbAdmin = 'Database administrator',
	backEndDev = 'Back-end developer',
	frontEndDev = 'Front-end developer',
	fullStackDev = 'Full-Stack developer',
}

export interface UserModel {
	googleId?: string;
	id: string;
	email: string;
	password?: string;
	lastName?: string;
	firstName?: string;
	color: string;
	username?: string;
	avatar?: string;
	location?: string;
	department?: string;
	organization?: string;
	jobTitle?: jobTitle;
	userSettingsId?: string;
	teams?: Team[];
	resetPasswordToken?: string | null;
	resetPasswordExpires?: Date | null;
	filtres?: string[];
	projects?: [];
}
