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
}
