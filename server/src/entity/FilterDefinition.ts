import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { FilterPart } from './FilterPart';

@Entity()
export class FilterDefinition {
	@PrimaryGeneratedColumn('increment')
	@IsNumber()
	id!: number;

	@OneToMany((type) => FilterPart, (filterPart) => filterPart.filterDefId)
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
