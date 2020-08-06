import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Sprint } from './Sprint';

@Entity()
export class Projects {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	name!: string;

	@Column()
	key!: string;

	@Column()
	projectType!: string;

	@Column()
	category!: string;

	@Column()
	defaultAssigneeID?: string;

	@Column()
	leadID?: string;

	@Column()
	creatorID?: string;

	@OneToMany((type) => Sprint, (sprint) => sprint.id)
	sprints?: Sprint[];
}
