import { IsArray } from 'class-validator';
import { Expose } from 'class-transformer';

export class Team {
	@Expose()
	id!: string;

	@Expose()
	description?: string;

	@Expose()
	@IsArray()
	links?: string[];

	@Expose()
	users?: string[];

	@Expose()
	createdBy!: string;

	@Expose()
	projects?: string[];

	@Expose()
	name?: string;

	@Expose()
	color?: string;
}
