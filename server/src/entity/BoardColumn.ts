import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsBoolean, IsDefined, IsString, MinLength } from 'class-validator';
import { Board } from './Board';

@Entity()
export class BoardColumn {
	@PrimaryGeneratedColumn('uuid')
	columnID!: string;

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

	@ManyToOne(type => Board, board => board.columns,{
		onDelete: 'CASCADE'
	})
	@IsDefined()
	board!: Board;

}
