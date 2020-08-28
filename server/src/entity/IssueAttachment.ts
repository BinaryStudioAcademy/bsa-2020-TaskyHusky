import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { Issue } from './Issue';

@Entity()
export class IssueAttachment {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	name!: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	@Matches(/https?:\/\/.+\..+((\/.+)|\/?)/)
	link!: string;

	@ManyToOne((type) => Issue, (issue) => issue.attachments)
	issue?: Issue;
}
