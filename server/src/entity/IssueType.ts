import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { Issue } from './Issue';

@Entity()
export class IssueType {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	icon?: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	color?: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	title?: string;

	@OneToMany((type) => Issue, (issue) => issue.type)
	issues?: Issue[];
}
