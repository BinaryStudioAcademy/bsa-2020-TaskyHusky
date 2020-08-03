import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Board } from './Board';

@Entity()
export class BoardColumn {
	@PrimaryGeneratedColumn('uuid')
	columnID!: string;

	@Column()
	columnName?: string;

	@Column()
	status?: string;

	@Column()
	isResolutionSet?: boolean;

	@ManyToOne(type => Board, board => board.columns)
	board!: Board;

}
