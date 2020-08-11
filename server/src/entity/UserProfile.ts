import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MinLength, IsEmail } from 'class-validator';
import {TeamsPeople} from './TeamsPeople';
import { Board } from './Board';
import { Filter } from './Filter';

@Entity()
export class UserProfile {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ nullable: true })
	firstName?: string;

	@Column({ nullable: true })
	lastName?: string;

	@Column({ nullable: true })
	username?: string;

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

	@Column()
	resetPasswordToken?:string;

	@Column()
	resetPasswordExpires?:string;

	@OneToMany(type => TeamsPeople, teams => teams.userId)
  	teams?: TeamsPeople[];

	@OneToMany(type => Board, board => board.createdBy)
	boards?: Board[];

	@OneToMany((type) => Filter, (filter) => filter.owner)
	filters?: Filter[];
}
