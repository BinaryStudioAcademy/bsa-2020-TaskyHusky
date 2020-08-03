import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FilterPart {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	name?: string;
}
