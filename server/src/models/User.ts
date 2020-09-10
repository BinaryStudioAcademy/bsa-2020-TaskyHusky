import { Team } from '../entity/Team';

export enum jobTitle {
	dbAdmin = 'Database administrator',
	backEndDev = 'Back-end developer',
	frontEndDev = 'Front-end developer',
	fullStackDev = 'Full-Stack developer',
	qa = 'Quality Assurance engineer',
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
	address?: string;
	lat?: number;
	lng?: number;
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
