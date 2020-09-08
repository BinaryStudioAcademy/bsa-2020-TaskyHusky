import { MinLength, IsEmail, IsNotEmpty, Length, IsLowercase, IsString, Matches } from 'class-validator';
import { Expose } from 'class-transformer';
import { jobTitle } from '../models/User';

export class UserProfile {
	@Expose()
	id!: string;

	@Expose()
	googleId?: string;

	@Expose()
	firstName?: string;

	@Expose()
	lastName?: string;

	@Expose()
	username?: string;

	@Expose()
	avatar?: string;

	@Expose()
	department?: string;

	@Expose()
	address?: string;

	@Expose()
	lat?: number;

	@Expose()
	lng?: number;

	@Expose()
	organization?: string;

	@Expose()
	@IsEmail()
	@Length(6, 30)
	@IsLowercase()
	@IsNotEmpty()
	email!: string;

	@Expose()
	jobTitle?: jobTitle;

	@Expose()
	userSettingsId?: string;

	@Expose()
	@MinLength(6)
	// @Matches(RegExp(/^(?=.*[0-9]+.*)(?=.*[A-Z]+.*)(?=.*[@$!%*#?&]+.*)(?=.*[a-z]+.*)[0-9a-zA-Z\d@$!%*#?&]*$/g))
	// this string will be unkomment as soon as all passwords in seeders matches
	password?: string;

	@Expose()
	oldPassword?: string;

	@Expose()
	resetPasswordToken?: string | null;

	@Expose()
	resetPasswordExpires?: Date | null;

	@Expose()
	filtres?: string[];

	@Expose()
	projects?: string[];

	@Expose()
	teams?: string[];

	@Expose()
	@IsString()
	color?: string;
}
