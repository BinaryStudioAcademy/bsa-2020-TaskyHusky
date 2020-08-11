import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { Sprint } from './Sprint';
import { Board } from './Board';

@Entity()
export class Projects {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	name!: string;

	@Column()
	key!: string;

	@Column({ type: 'text', nullable: true })
	category?: string;

	@Column({ type: 'text', nullable: true })
	defaultAssigneeID?: string;

	@Column({ type: 'uuid', nullable: true })
	leadID?: string;

	@Column({ type: 'uuid', nullable: true })
	creatorID!: string;

	@OneToMany((type) => Sprint, (sprint) => sprint.id)
	sprints?: Sprint[];

	@ManyToMany((type) => Board, board => board.projects)
	boards?: Board[];
}
