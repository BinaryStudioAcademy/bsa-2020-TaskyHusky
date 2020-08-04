import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsString, MinLength } from 'class-validator';
import { BoardColumn } from './BoardColumn';

@Entity()
export class Board {
	@PrimaryGeneratedColumn('uuid')
	boardID!: string;

	@Column()
	@IsString()
	@MinLength(1)
	boardType?: string;

	@OneToMany(type => BoardColumn, boardColumn => boardColumn.board)
	columns?: BoardColumn[];
}
