import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { FilterPart } from './FilterPart';

@Entity()
export class FilterDefinition {
	@PrimaryGeneratedColumn('uuid')
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
