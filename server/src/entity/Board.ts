import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BoardColumn } from './BoardColumn';

@Entity()
export class Board {
	@PrimaryGeneratedColumn('uuid')
	boardID!: string;

	@Column()
	boardType?: string;

	@OneToMany(type => BoardColumn, boardColumn => boardColumn.board)
	columns?: BoardColumn[];
}
