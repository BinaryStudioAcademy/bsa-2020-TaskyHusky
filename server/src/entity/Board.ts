import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsString, MinLength } from 'class-validator';
import { BoardColumn } from './BoardColumn';
import { Sprint } from './Sprint';

@Entity()
export class Board {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	@IsString()
	@MinLength(1)
	boardType?: string;

	@OneToMany((type) => BoardColumn, (boardColumn) => boardColumn.board)
	columns?: BoardColumn[];

	@OneToMany((type) => Sprint, (sprint) => sprint.id)
	sprints?: Sprint[];
}
