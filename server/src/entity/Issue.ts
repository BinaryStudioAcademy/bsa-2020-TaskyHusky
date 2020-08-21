import {
	Entity,
	Column,
	ManyToOne,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	JoinTable,
} from 'typeorm';

import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { IssueStatus } from './IssueStatus';
import { UserProfile } from './UserProfile';
import { IssueType } from './IssueType';
import { Priority } from './Priority';
import { BoardColumn } from './BoardColumn';
import { Sprint } from './Sprint';
import { Projects } from './Projects';

@Entity()
export class Issue {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ManyToOne((type) => IssueType, (issueType) => issueType.issues, { eager: true })
	type?: IssueType;

	@ManyToOne((type) => IssueStatus, (issueStatus) => issueStatus.issues)
	status?: IssueStatus;

	@Column()
	@IsNotEmpty()
	@IsString()
	summary?: string;

	@ManyToOne((type) => BoardColumn, (boardColumn) => boardColumn.issues)
	boardColumn?: BoardColumn;

	@Column({ array: true })
	labels?: string;

	@Column({ array: true })
	@IsArray()
	attachments?: string;

	@Column({ array: true })
	@IsArray()
	links?: string;

	@ManyToOne((type) => Priority, (priority) => priority.issues, { eager: true })
	priority?: Priority;

	@Column({ nullable: true })
	description?: string;

	@ManyToOne((type) => Sprint, (sprint) => sprint.issues)
	sprint?: Sprint;

	@ManyToOne((type) => Projects, (projects) => projects.issues)
	project?: Projects;

	@Column()
	@IsNotEmpty()
	@IsString()
	issueKey?: string;

	@ManyToOne((type) => UserProfile, (userProfile) => userProfile.assignedIssues, { eager: true })
	assigned?: UserProfile;

	@ManyToOne((type) => UserProfile, (userProfile) => userProfile.createdIssues)
	creator!: UserProfile;

	@ManyToMany((type) => UserProfile, (user) => user.watchingIssues)
	@JoinTable()
	watchers?: string[];

	@CreateDateColumn({ type: 'date' })
	createdAt?: Date;

	@UpdateDateColumn({ type: 'date' })
	updatedAt?: Date;
}
