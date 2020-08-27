import { IsString, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class Filter {
	@Expose()
	id!: string;

	@Expose()
	owner?: string;

	@Expose()
	filterParts?: string[];

	@Expose()
	@IsString()
	@IsNotEmpty()
	name!: string;

	@Expose()
	staredBy?: string[];
}
