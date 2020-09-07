import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { UserProfile } from './UserProfile';
import { FilterPart } from './FilterPart';
@Entity()
export class Filter {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ManyToOne((type) => UserProfile, (user) => user.filters, {
		onDelete: 'CASCADE',
	})
	owner!: UserProfile;

	@OneToMany((type) => FilterPart, (filterPart) => filterPart.filter, { cascade: true })
	filterParts?: FilterPart[];

	@Column()
	@IsString()
	@IsNotEmpty()
	name!: string;

	@ManyToMany((type) => UserProfile)
	@JoinTable()
	staredBy?: UserProfile[];
}
