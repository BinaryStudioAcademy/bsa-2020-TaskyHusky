import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { IsUUID, IsString, IsNotEmpty } from 'class-validator';
import { Issue } from './Issue';

@Entity()
export class Priority {
	@PrimaryGeneratedColumn('uuid')
	@IsUUID()
	id!: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	icon!: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	color!: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	title!: string;

	@OneToMany((type) => Issue, (issue) => issue.priority)
	issues?: Issue[];
}
