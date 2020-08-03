import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { FilterDefinition } from './FilterDefinition';
import { Filter } from './Filter';
// import User from './User';

@Entity()
export class FilterPart {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@OneToOne(type => Filter, filter => filter.id)
	@JoinColumn()
	@Column()
    filter?: Filter;
	
	@OneToOne(type => FilterDefinition, filterDef => filterDef.id)
	@JoinColumn()
	@Column()
	filterDef?: string;

	// @ManyToMany(type => User)
	// @Column()
	// members?: User[];
	
	@Column()
	searchText?: string;
}
