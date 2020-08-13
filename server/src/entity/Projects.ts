import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne, JoinTable } from 'typeorm';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Issue } from './Issue';
import { Sprint } from './Sprint';
import { Board } from './Board';
import { UserProfile } from './UserProfile';

@Entity()
export class Projects {
	@PrimaryGeneratedColumn('uuid')
	@IsUUID()
	id!: string;

	@Column()
	@IsNotEmpty()
	@IsString()
	name!: string;

	@Column()
	@IsNotEmpty()
	@IsString()
	key!: string;

	@Column({ type: 'text', nullable: true })
	category?: string;

	@OneToMany((type) => Sprint, (sprint) => sprint.id)
	sprints?: Sprint[];

	@ManyToMany((type) => Board, (board) => board.projects)
	@JoinTable({ name: 'project_boards' })
	boards?: Board[];

	@ManyToOne((type) => UserProfile, (userProfile) => userProfile.assignedProjects, { cascade: true })
	defaultAssignee?: UserProfile;

	@ManyToOne((type) => UserProfile, (userProfile) => userProfile.leadedProjects, { cascade: true })
	lead?: UserProfile;

	@ManyToOne((type) => UserProfile, (userProfile) => userProfile.createdProjects, { cascade: true })
	@IsNotEmpty()
	creator!: UserProfile;

	@OneToMany((type) => Issue, (issue) => issue.project)
	issues?: Issue[];

	@ManyToMany((type) => UserProfile, (userProfile) => userProfile.projects)
	@JoinTable({ name: 'projects_people' })
	users?: UserProfile[];
}
