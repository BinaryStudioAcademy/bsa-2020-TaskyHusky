import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { IsString, IsUUID } from 'class-validator';
import { FilterDefinition } from './FilterDefinition';
import { Filter } from './Filter';
import { UserProfile } from './UserProfile';

@Entity()
export class FilterPart {
	@PrimaryGeneratedColumn('uuid')
	@IsUUID()
	id!: string;

	@ManyToOne((type) => Filter, (filter) => filter.filterParts)
	filter?: Filter;

	@ManyToOne((type) => FilterDefinition, (filterDefinition) => filterDefinition.filterParts)
	filterDef?: FilterDefinition;

	// TODO: can be any of existing entity - you filter tasks by userID or taskType, or some string etc... (or empty);
	@ManyToMany((type) => UserProfile)
	@JoinTable()
	members?: UserProfile[];

	@Column()
	@IsString()
	searchText?: string;
}
