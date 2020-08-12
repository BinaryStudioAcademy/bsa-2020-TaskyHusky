import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { IsBoolean, IsDefined, IsString, MinLength } from 'class-validator';
import { Board } from './Board';
import { Issue } from './Issue';

@Entity()
export class BoardColumn {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	@IsString()
	@MinLength(1)
	columnName?: string;

	@Column()
	@IsString()
	@MinLength(1)
	status?: string;

	@Column()
	@IsBoolean()
	isResolutionSet?: boolean;

	@ManyToOne((type) => Board, (board) => board.columns, {
		onDelete: 'CASCADE',
	})
	@IsDefined()
	board!: Board;

	@OneToMany((type) => Issue, (issue) => issue.boardColumn, {
		onDelete: 'CASCADE',
	})
	issues!: Issue[];
}
