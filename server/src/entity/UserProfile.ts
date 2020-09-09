import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { MinLength, IsEmail, IsNotEmpty, Length, IsLowercase } from 'class-validator';
import { Issue } from './Issue';
import { Board } from './Board';
import { Filter } from './Filter';
import { Projects } from './Projects';
import { Team } from './Team';
import { Notification } from './Notification';

@Entity()
export class UserProfile {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ nullable: true })
	googleId?: string;

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
	address?: string;

	@Column({ nullable: true, type: 'float8' })
	lat?: number;

	@Column({ nullable: true, type: 'float8' })
	lng?: number;

	@Column({ nullable: true })
	organization?: string;

	@Column({ unique: true })
	@IsEmail()
	@Length(6, 30)
	@IsLowercase()
	@IsNotEmpty()
	email!: string;

	@Column({ nullable: true })
	jobTitle?: string;

	@Column({ nullable: true })
	userSettingsId?: string;

	@Column()
	@MinLength(6)
	password?: string;

	@Column({ nullable: true })
	color?: string;

	@OneToMany((type) => Board, (board) => board.createdBy)
	boards?: Board[];

	@Column({ type: 'character varying', name: 'resetPasswordToken', nullable: true })
	public resetPasswordToken?: string | null;

	@Column({ type: 'timestamp without time zone', name: 'resetPasswordExpires', nullable: true })
	public resetPasswordExpires?: Date | null;

	@Column({ type: 'character varying', name: 'resetEmailToken', nullable: true })
	public resetEmailToken?: string | null;

	@Column({ type: 'timestamp without time zone', name: 'resetEmailExpires', nullable: true })
	public resetEmailExpires?: Date | null;

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

	@ManyToMany((type) => UserProfile, (userProfile) => userProfile.incomingInvites)
	@JoinTable()
	incomingInvites?: UserProfile[];

	@ManyToMany((type) => UserProfile, (userProfile) => userProfile.pendingInvites)
	@JoinTable()
	pendingInvites?: UserProfile[];

	@ManyToMany((type) => UserProfile, (userProfile) => userProfile.teammates)
	@JoinTable()
	teammates?: UserProfile[];

	@ManyToMany((type) => Issue, (issue) => issue.watchers)
	watchingIssues?: Issue[];

	@OneToMany((type) => Notification, (notification) => notification.user)
	notifications?: Notification[];

	constructor(userData?: Partial<UserProfile>) {
		if (userData) {
			const { email, password, firstName, lastName } = userData;

			this.firstName = firstName;
			this.lastName = lastName;

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			this.email = email!;
			this.password = password;
			this.avatar = userData.avatar;
			this.googleId = userData.googleId;
		}
	}
}
