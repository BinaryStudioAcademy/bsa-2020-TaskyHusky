import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sprint {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	sprintName?: string;

	@Column()
	projectID?: string;

	@Column()
	boardID?: string;

	@Column()
	isActive?: string;

	@Column()
	isCompleted?: string;
}
