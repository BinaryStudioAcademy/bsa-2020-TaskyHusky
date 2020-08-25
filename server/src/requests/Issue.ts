import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { Expose } from 'class-transformer';

export class Issue {
	@Expose()
	id!: string;

	@Expose()
	@IsNotEmpty()
	@IsString()
	summary?: string;

	@Expose()
	boardColumn?: string;

	@Expose()
	labels?: string[];

	@Expose()
	@IsArray()
	attachments?: string[];

	@Expose()
	@IsArray()
	links?: string[];

	@Expose()
	priority?: {
		id: string;
		color: string;
		title: string;
		icon: string;
	};

	@Expose()
	description?: string;

	@Expose()
	sprint?: string;

	@Expose()
	project?: string;

	@Expose()
	@IsNotEmpty()
	@IsString()
	issueKey?: string;

	@Expose()
	assigned?: string;

	@Expose()
	creator!: string;

	@Expose()
	watchers?: string[];

	@Expose()
	createdAt?: Date;

	@Expose()
	updatedAt?: Date;

	@Expose()
	type?: {
		id: string;
		color: string;
		title: string;
		icon: string;
	};
}
