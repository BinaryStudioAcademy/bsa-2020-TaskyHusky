import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { Issue } from './Issue';

@Entity()
export class Priority {
	@PrimaryGeneratedColumn('increment')
	@IsNumber()
	id!: number;

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
