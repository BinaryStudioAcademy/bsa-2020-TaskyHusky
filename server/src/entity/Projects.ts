import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToMany,
	OneToMany,
	ManyToOne,
	JoinTable,
	DeleteDateColumn,
	VersionColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsString, Length, IsUppercase } from 'class-validator';
import { Issue } from './Issue';
import { Sprint } from './Sprint';
import { Board } from './Board';
import { UserProfile } from './UserProfile';

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
	icon?: string;

	@Column({ type: 'text', default: '' })
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

	@ManyToOne((type) => UserProfile, (userProfile) => userProfile.leadedProjects, { cascade: true })
	lead!: UserProfile;

	@ManyToOne((type) => UserProfile, (userProfile) => userProfile.createdProjects, { cascade: true })
	creator!: UserProfile;

	@OneToMany((type) => Issue, (issue) => issue.project, { cascade: true })
	issues?: Issue[];

	@ManyToMany((type) => UserProfile, (userProfile) => userProfile.projects, { cascade: true })
	@JoinTable({ name: 'projects_people' })
	users!: UserProfile[];

	@CreateDateColumn()
	createdDate?: Date;

	@UpdateDateColumn()
	updatedDate?: Date;

	@DeleteDateColumn()
	deletedDate?: Date;

	@VersionColumn()
	version?: number;
}
