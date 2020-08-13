import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { Issue } from './Issue';
import { Projects } from './Projects';
import { Board } from './Board';

@Entity()
export class Sprint {
	@PrimaryGeneratedColumn('uuid')
	@IsUUID()
	id!: string;

	@Column()
	@IsString()
	sprintName?: string;

	@ManyToOne((type) => Projects, (projects) => projects.sprints, { onDelete: 'CASCADE' })
	@IsUUID()
	project?: Projects;

	@ManyToOne((type) => Board, (board) => board.sprints, { onDelete: 'CASCADE' })
	@IsUUID()
	board?: Board;

	@Column()
	@IsBoolean()
	isActive?: boolean;

	@Column()
	@IsBoolean()
	isCompleted?: boolean;

	@OneToMany((type) => Issue, (issue) => issue.sprint, { onDelete: 'CASCADE' })
	issues?: Issue[];
}
