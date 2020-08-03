import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FilterDefinition {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	filterType?: string;

	@Column()
	itemType?: string;

	@Column()
	title?: string;
}
