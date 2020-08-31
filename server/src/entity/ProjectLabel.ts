import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, DeleteDateColumn, CreateDateColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsHexColor } from 'class-validator';
import { Projects } from './Projects';

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

	@ManyToOne((type) => Projects, (project) => project.labels)
	project!: Projects;

	@CreateDateColumn()
	createdDate?: Date;

	@DeleteDateColumn()
	deletedDate?: Date;
}
