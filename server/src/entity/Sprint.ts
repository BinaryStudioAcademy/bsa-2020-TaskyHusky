import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { IsBoolean } from 'class-validator';
import { Issue } from './Issue';
import { Projects } from './Projects';
import { Board } from './Board';

@Entity()
export class Sprint {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	sprintName?: string;

	@ManyToOne((type) => Projects, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	project?: Projects;

	@ManyToOne((type) => Board, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	board?: Board;

	@Column()
	@IsBoolean()
	isActive?: boolean;

	@Column()
	@IsBoolean()
	isCompleted?: boolean;

	@OneToMany((type) => Issue, (issue) => issue.id)
	issues?: [];
}
