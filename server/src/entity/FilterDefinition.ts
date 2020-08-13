import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { FilterPart } from './FilterPart';

@Entity()
export class FilterDefinition {
	@PrimaryGeneratedColumn('uuid')
	@IsUUID()
	id!: string;

	@OneToMany((type) => FilterPart, (filterPart) => filterPart.filterDef)
	filterParts?: FilterPart[];

	@Column()
	@IsString()
	@IsNotEmpty()
	filterType!: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	dataType!: string;

	@Column()
	@IsNotEmpty()
	@IsString()
	title!: string;
}
