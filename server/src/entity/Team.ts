import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { IsNotEmpty, IsString, IsArray, IsUUID } from 'class-validator';
import { UserProfile } from './UserProfile';

@Entity()
export class Team {
	@PrimaryGeneratedColumn('uuid')
	@IsUUID()
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
