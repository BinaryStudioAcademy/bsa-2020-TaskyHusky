import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';

@Entity()
export class FilterDefinition {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	filterType!: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	dataType!: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	title!: string;
}
