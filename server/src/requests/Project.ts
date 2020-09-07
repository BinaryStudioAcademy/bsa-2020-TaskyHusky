import { IsNotEmpty, IsString, Length, IsUppercase } from 'class-validator';
import { Expose } from 'class-transformer';

export class Project {
	@Expose()
	id!: string;

	@Expose()
	@IsNotEmpty()
	@IsString()
	@Length(5, 40)
	name!: string;

	@Expose()
	avatar?: string;

	@Expose()
	@IsString()
	@IsUppercase()
	@Length(2, 10)
	key!: string;

	@Expose()
	@IsString()
	@Length(0, 256)
	description?: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	icon!: string;

	@Expose()
	@IsString()
	url?: string;

	@Expose()
	@IsString()
	color?: string;

	@Expose()
	category?: string;
}
