import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToMany,
	OneToMany,
	ManyToOne,
	JoinTable,
	DeleteDateColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

import { IsNotEmpty, IsString, Length, IsUppercase, Matches, ValidateIf } from 'class-validator';
import _ from 'lodash';
import { Issue } from './Issue';
import { Sprint } from './Sprint';
import { Board } from './Board';
import { UserProfile } from './UserProfile';
import { Team } from './Team';

@Entity()
export class Projects {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	@IsNotEmpty()
	@IsString()
	@Length(5, 40)
	name!: string;

	@Column()
	@IsString()
	@IsUppercase()
	@Length(2, 10)
	key!: string;

	@Column({ type: 'text', default: '' })
	@IsString()
	@Length(0, 256)
	description?: string;

	@Column({ type: 'text', default: '' })
	@IsString()
	@IsNotEmpty()
	icon!: string;

	@IsString()
	url?: string;

	@Column({ type: 'text', default: '' })
	category?: string;

	@OneToMany((type) => Sprint, (sprint) => sprint.project, { cascade: true })
	sprints?: Sprint[];

	@ManyToMany((type) => Board, (board) => board.projects)
	@JoinTable({ name: 'project_boards' })
	boards?: Board[];

	@ManyToOne((type) => UserProfile, (userProfile) => userProfile.assignedProjects, { cascade: true })
	defaultAssignee?: UserProfile;

	@ManyToOne((type) => UserProfile, (userProfile) => userProfile.leadedProjects, {
		cascade: true,
		onDelete: 'CASCADE',
	})
	lead!: UserProfile;

	@ManyToOne((type) => UserProfile, (userProfile) => userProfile.createdProjects, {
		cascade: true,
		onDelete: 'CASCADE',
	})
	creator!: UserProfile;

	@ManyToOne((type) => Team, (team) => team.projects, { cascade: true, onDelete: 'CASCADE' })
	team?: Team;

	@OneToMany((type) => Issue, (issue) => issue.project, { cascade: true, onDelete: 'CASCADE' })
	issues?: Issue[];

	@ManyToMany((type) => UserProfile, (userProfile) => userProfile.projects, { cascade: true })
	@JoinTable({ name: 'projects_people' })
	users!: UserProfile[];

	@Column({ nullable: true })
	@ValidateIf((o) => !_.isEmpty(o.githubUrl))
	@IsString()
	@Matches(/(https:\/\/github\.com\/.+\/.+\.git)|/)
	githubUrl?: string;

	@CreateDateColumn()
	createdDate?: Date;

	@UpdateDateColumn()
	updatedDate?: Date;

	@DeleteDateColumn()
	deletedDate?: Date;
}
