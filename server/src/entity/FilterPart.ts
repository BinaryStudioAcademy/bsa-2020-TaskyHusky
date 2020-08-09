import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { FilterDefinition } from './FilterDefinition';
import { Filter } from './Filter';
import { UserProfile } from './UserProfile';

@Entity()
export class FilterPart {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	filterId?: string;

	@Column()
	filterDefId?: string;

	@ManyToMany((type) => UserProfile)
	@JoinTable()
	members?: UserProfile[];

	@Column()
	searchText?: string;
}
