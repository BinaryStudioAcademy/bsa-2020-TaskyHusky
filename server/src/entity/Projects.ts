import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Projects {
	@PrimaryGeneratedColumn('uuid')
	projectID!: string;

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
}
