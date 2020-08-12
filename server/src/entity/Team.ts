import { Entity, Column, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { UserProfile } from './UserProfile';

@Entity()
export class Team {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	@IsNotEmpty()
	@IsString()
	description?: string;

	@Column('text', { array: true })
	@IsArray()
	links?: string;

	@ManyToMany((type) => UserProfile, (userProfile) => userProfile.teams)
	@JoinTable({ name: 'teams_people' })
	users?: UserProfile[];
}
