import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	DeleteDateColumn,
	CreateDateColumn,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import { IsNotEmpty, IsString, IsHexColor } from 'class-validator';
import { Projects } from './Projects';
import { Issue } from './Issue';

@Entity()
export class ProjectLabel {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	@IsNotEmpty()
	@IsString()
	text!: string;

	@Column()
	@IsNotEmpty()
	@IsString()
	@IsHexColor()
	textColor!: string;

	@Column()
	@IsNotEmpty()
	@IsString()
	@IsHexColor()
	backgroundColor!: string;

	@ManyToOne((type) => Projects, (project) => project.labels, { onDelete: 'CASCADE' })
	project!: Projects;

	@ManyToMany((type) => Issue, (issue) => issue.labels)
	@JoinTable()
	issues?: Issue[];

	@CreateDateColumn()
	createdDate?: Date;

	@DeleteDateColumn()
	deletedDate?: Date;
}
