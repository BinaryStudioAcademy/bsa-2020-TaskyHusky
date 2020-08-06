import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Projects {
	@PrimaryGeneratedColumn('uuid')
	projectID!: string;

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
}
