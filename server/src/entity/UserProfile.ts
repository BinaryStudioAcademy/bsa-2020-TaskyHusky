import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MinLength, IsEmail } from 'class-validator';
import { Filter } from './Filter';

@Entity()
export class UserProfile {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ nullable: true })
	fullName?: string;

	@Column({ nullable: true })
	userame?: string;

	@Column({ nullable: true })
	avatar?: string;

	@Column({ nullable: true })
	department?: string;

	@Column({ nullable: true })
	location?: string;

	@Column({ nullable: true })
	organization?: string;

	@Column({ unique: true })
	@IsEmail()
	email?: string;

	@Column({ nullable: true })
	jobTitle?: string;

	@Column({ nullable: true })
	userSettingsId?: string;

	@Column()
	@MinLength(6)
	password?: string;

	@OneToMany((type) => Filter, (filter) => filter.owner)
	filters?: Filter[];
}
