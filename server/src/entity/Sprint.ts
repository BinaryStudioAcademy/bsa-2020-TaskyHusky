import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { IsBoolean, IsString, IsUUID, IsDate } from 'class-validator';
import { Issue } from './Issue';
import { Projects } from './Projects';
import { Board } from './Board';

@Entity()
export class Sprint {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	@IsString()
	sprintName!: string;

	@ManyToOne((type) => Projects, (projects) => projects.sprints, { onDelete: 'CASCADE', eager: true })
	@IsUUID()
	project?: Projects;

	@ManyToOne((type) => Board, (board) => board.sprints, { onDelete: 'CASCADE', eager: true })
	@IsUUID()
	board?: Board;

	@Column()
	@IsBoolean()
	isActive!: boolean;

	@Column()
	@IsBoolean()
	isCompleted!: boolean;

	@OneToMany((type) => Issue, (issue) => issue.sprint, { onDelete: 'CASCADE', eager: true })
	issues!: Issue[];

	@Column({ nullable: true })
	@IsDate()
	startDate?: Date;

	@Column({ nullable: true })
	@IsDate()
	endDate?: Date;
}
