import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsString } from 'class-validator';
import { FilterDefinition } from './FilterDefinition';
import { Filter } from './Filter';

@Entity()
export class FilterPart {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ManyToOne((type) => Filter, (filter) => filter.id, { onDelete: 'CASCADE' })
	filter?: Filter;

	@ManyToOne((type) => FilterDefinition, (filterDefinition) => filterDefinition.filterParts, {
		cascade: true,
		nullable: false,
	})
	filterDef!: FilterDefinition;

	@Column({ type: 'simple-array' })
	members?: string[];

	@Column()
	@IsString()
	searchText?: string;
}
