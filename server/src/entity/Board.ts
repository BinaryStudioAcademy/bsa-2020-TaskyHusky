import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
	@PrimaryGeneratedColumn('uuid')
	boardID!: string;

	@Column()
	boardType?: string;
}
