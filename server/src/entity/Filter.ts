import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { UserProfile } from './UserProfile';
@Entity()
export class Filter {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ManyToOne((type) => UserProfile, (user) => user.filters)
	owner?: UserProfile;

	// TODO: add rel to
	@Column({ nullable: false })
	ownerId?: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	name!: string;

	@ManyToMany((type) => UserProfile)
	@JoinTable()
	staredBy?: UserProfile[];
}
