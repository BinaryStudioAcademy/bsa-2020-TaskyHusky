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
import { Board } from './Board';

@Entity()
export class Issue {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ManyToOne((type) => IssueType, (issueType) => issueType.issues, { eager: true })
	type!: IssueType;

	@ManyToOne((type) => IssueStatus, (issueStatus) => issueStatus.issues, { eager: true })
	status?: IssueStatus;

	@Column()
	@IsNotEmpty()
	@IsString()
	summary!: string;

	@ManyToOne((type) => BoardColumn, (boardColumn) => boardColumn.issues, { onDelete: 'CASCADE' })
	boardColumn?: BoardColumn;

	@ManyToOne((type) => Board, (board) => board.issues, { onDelete: 'CASCADE' })
	board?: Board;

	@Column({ array: true })
	labels?: string;

	@Column({ array: true, nullable: true })
	@IsArray()
	attachments?: string;

	@Column({ array: true })
	@IsArray()
	links?: string;

	@ManyToOne((type) => Priority, (priority) => priority.issues, { eager: true })
	priority?: Priority;

	@Column({ nullable: true })
	description?: string;

	@ManyToOne((type) => Sprint, (sprint) => sprint.issues, { onDelete: 'SET NULL' })
	sprint?: Sprint;

	@ManyToOne((type) => Projects, (projects) => projects.issues, { onDelete: 'CASCADE' })
	project?: Projects;

	@Column()
	@IsNotEmpty()
	@IsString()
	issueKey?: string;

	@ManyToOne((type) => UserProfile, (userProfile) => userProfile.assignedIssues, { eager: true, onDelete: 'CASCADE' })
	assigned?: UserProfile;

	@ManyToOne((type) => UserProfile, (userProfile) => userProfile.createdIssues, { onDelete: 'CASCADE' })
	creator!: UserProfile;

	@ManyToMany((type) => UserProfile, (user) => user.watchingIssues)
	@JoinTable()
	watchers?: UserProfile[];

	@CreateDateColumn({ type: 'date' })
	createdAt?: Date;

	@UpdateDateColumn({ type: 'date' })
	updatedAt?: Date;
}
