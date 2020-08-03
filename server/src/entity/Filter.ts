import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Filter {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	name?: string;

	@Column()
	text?: string;
}
