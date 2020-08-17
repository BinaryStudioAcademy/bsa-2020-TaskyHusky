import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable, OneToMany } from 'typeorm';
import { IsString, IsArray, IsUUID } from 'class-validator';
import { UserProfile } from './UserProfile';
import { Projects } from './Projects';

@Entity()
export class Team {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ nullable: true })
	description?: string;

	@Column('text', { array: true })
	@IsArray()
	links?: string[];

	@ManyToMany((type) => UserProfile, (userProfile) => userProfile.teams)
	@JoinTable({ name: 'teams_people' })
	users?: UserProfile[];

	@ManyToOne(() => UserProfile, (user: UserProfile) => user.teamsOwner, { cascade: true })
	createdBy?: UserProfile;

	@OneToMany(() => Projects, (project: Projects) => project.team)
	projects?: Projects[];

	@Column()
	name?: string;

	@Column({ nullable: true })
	color?: string;
}
