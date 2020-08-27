import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

export class Sprint {
	@Expose()
	id!: string;

	@Expose()
	@IsString()
	sprintName!: string;

	@Expose()
	@IsUUID()
	project?: string;

	@Expose()
	@IsUUID()
	board?: string;

	@Expose()
	@IsBoolean()
	isActive!: boolean;

	@Expose()
	@IsBoolean()
	isCompleted!: boolean;

	@Expose()
	issues!: string[];
}
