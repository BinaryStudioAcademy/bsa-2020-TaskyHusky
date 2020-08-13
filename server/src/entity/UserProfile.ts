import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { MinLength, IsEmail, IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { Issue } from './Issue';
import { Board } from './Board';
import { Filter } from './Filter';
import { Projects } from './Projects';
import { Team } from './Team';

@Entity()
export class UserProfile {
	@PrimaryGeneratedColumn('uuid')
	@IsUUID()
	id!: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	firstName!: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	lastName!: string;

	@Column({ nullable: true })
	@IsString()
	username?: string;

	@Column({ nullable: true })
	@IsString()
	avatar?: string;

	@Column({ nullable: true })
	@IsString()
	department?: string;

	@Column({ nullable: true })
	@IsString()
	location?: string;

	@Column({ nullable: true })
	@IsString()
	organization?: string;

	@Column({ unique: true })
	@IsEmail()
	@IsNotEmpty()
	email?: string;

	@Column({ nullable: true })
	@IsString()
	jobTitle?: string;

	@Column({ nullable: true })
	userSettingsId?: string;

	@Column()
	@MinLength(6)
	password!: string;

	@OneToMany((type) => Board, (board) => board.createdBy)
	boards?: Board[];

	@OneToMany((type) => Filter, (filter) => filter.owner)
	filters?: Filter[];

	@OneToMany((type) => Projects, (projects) => projects.defaultAssignee)
	assignedProjects?: Projects[];

	@OneToMany((type) => Projects, (projects) => projects.lead)
	leadedProjects?: Projects[];

	@OneToMany((type) => Projects, (projects) => projects.creator)
	createdProjects!: Projects[];

	@OneToMany((type) => Issue, (issue) => issue.assigned)
	assignedIssues?: Issue[];

	@OneToMany((type) => Issue, (issue) => issue.creator)
	createdIssues?: Issue[];

	@ManyToMany((type) => Team, (team) => team.users, {
		cascade: true,
	})
	teams?: Team[];

	@ManyToMany((type) => Projects, (projects) => projects.users)
	projects?: Projects[];
}
