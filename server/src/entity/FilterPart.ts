import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { FilterDefinition } from './FilterDefinition';
import { Filter } from './Filter';
import { User } from './User';

@Entity()
export class FilterPart {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	filterId?: string;

	@Column()
	filterDefId?: string;

	@ManyToMany((type) => User)
	@JoinTable()
	members?: User[];

	@Column()
	searchText?: string;
}
