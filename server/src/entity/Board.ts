import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { IsDefined, IsString, MinLength } from 'class-validator';
import { BoardColumn } from './BoardColumn';
import { Sprint } from './Sprint';
import { UserProfile } from './UserProfile';
import { BoardType } from '../models/Board';
import { Projects } from './Projects';

@Entity()
export class Board {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column('text')
	boardType!: BoardType;

	@Column()
	@IsString()
	@MinLength(1)
	name!: string;

	@OneToMany((type) => BoardColumn, (boardColumn) => boardColumn.board)
	columns?: BoardColumn[];

	@OneToMany((type) => Sprint, (sprint) => sprint.id)
	sprints?: Sprint[];

	@ManyToOne((type) => UserProfile, (user) => user.boards, {
		onDelete: 'CASCADE',
	})
	@IsDefined()
	createdBy!: UserProfile;

	@ManyToMany((type) => Projects, project => project.boards,{
		cascade:true
	})
	@JoinTable()
	projects?: Projects[];
}
