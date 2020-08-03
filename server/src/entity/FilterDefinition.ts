import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FilterDefinition {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	name?: string;
}
