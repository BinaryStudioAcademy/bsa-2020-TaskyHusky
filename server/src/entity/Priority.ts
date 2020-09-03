import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Issue } from './Issue';

@Entity()
export class Priority {
	// must be autoincrement
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
