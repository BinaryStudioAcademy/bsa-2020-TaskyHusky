import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { MinLength, IsEmail, IsString, IsNotEmpty, IsUUID, Length, IsLowercase } from 'class-validator';
import { Issue } from './Issue';
import { Board } from './Board';
import { Filter } from './Filter';
import { Projects } from './Projects';
import { Team } from './Team';

@Entity()
export class UserProfile {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	firstName?: string;

	@Column()
	@IsString()
	@IsNotEmpty()
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
	@Length(6, 30)
	@IsLowercase()
	@IsNotEmpty()
	email?: string;

	@Column({ nullable: true })
	jobTitle?: string;

	@Column({ nullable: true })
	userSettingsId?: string;

	@Column()
	@MinLength(6)
	password?: string;

	@OneToMany((type) => Board, (board) => board.createdBy)
	boards?: Board[];

	@OneToMany((type) => Filter, (filter) => filter.owner)
	filters?: Filter[];

	@OneToMany((type) => Projects, (projects) => projects.defaultAssignee)
	assignedProjects?: Projects[];

	@OneToMany((type) => Projects, (projects) => projects.lead)
	leadedProjects?: Projects[];

	@OneToMany((type) => Projects, (projects) => projects.creator)
	createdProjects?: Projects[];

	@OneToMany((type) => Team, (teams) => teams.createdBy)
	teamsOwner?: Team[];

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

	constructor(userData: Partial<UserProfile>) {
		if (userData) {
			const { email, password, firstName, lastName } = userData;

			this.firstName = firstName;
			this.lastName = lastName;
			this.email = email;
			this.password = password;
		}
	}
}
