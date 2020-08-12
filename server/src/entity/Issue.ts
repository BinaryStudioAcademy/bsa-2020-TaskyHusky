import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IssueType } from './IssueType';
import { Priority } from './Priority';
import { BoardColumn } from './BoardColumn';
import { Sprint } from './Sprint';
import { Projects } from './Projects';

@Entity()
export class Issue {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ManyToOne((type) => IssueType)
	type?: IssueType;

	@Column()
	summary?: string;

	@ManyToOne((type) => BoardColumn)
	boardColumn?: BoardColumn;

	@Column({ array: true })
	labels?: string;

	@Column({ array: true })
	attachments?: string;

	@Column({ array: true })
	links?: string;

	@ManyToOne((type) => Priority)
	priority?: Priority;

	@Column()
	description?: string;

	@ManyToOne((type) => Sprint)
	sprint?: Sprint;

	@ManyToOne((type) => Projects)
	project?: Projects;

	@Column()
	issueKey?: string;

	@Column() // Replace with rel.
	assignedID?: string;

	@Column() // Replace with rel.
	creatorID?: string;
}
