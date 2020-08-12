import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { FilterDefinition } from './FilterDefinition';
import { Filter } from './Filter';
import { UserProfile } from './UserProfile';
import { IssueType } from './IssueType';

@Entity()
export class FilterPart {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	// TODO: add many to one rel to filters
	@Column()
	filterId?: string;

	// TODO: add many to one rel to filters
	@Column()
	filterDefId?: string;

	// TODO: can be any of existing entity - filter tasks by userID or taskType etc... (or empty)
	@ManyToMany((type) => UserProfile)
	@JoinTable()
	members?: UserProfile[];

	@Column()
	@IsString()
	searchText?: string;
}
