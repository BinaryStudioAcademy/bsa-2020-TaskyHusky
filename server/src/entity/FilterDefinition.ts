import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FilterDefinition {
	@PrimaryGeneratedColumn('increment')
	id!: number;

	@Column()
	filterType!: string;

	@Column()
	dataType!: string;

	@Column()
	title!: string;
}
