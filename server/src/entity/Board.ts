import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	ManyToOne,
	CreateDateColumn,
	ManyToMany,
	UpdateDateColumn,
} from 'typeorm';
import { IsDefined, IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { BoardColumn } from './BoardColumn';
import { Sprint } from './Sprint';
import { UserProfile } from './UserProfile';
import { BoardType } from '../models/Board';
import { Projects } from './Projects';
import { Issue } from './Issue';

@Entity()
export class Board {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column('text')
	boardType!: BoardType;

	@Column()
	@IsString()
	@IsNotEmpty()
	name!: string;

	@OneToMany((type) => BoardColumn, (boardColumn) => boardColumn.board)
	columns?: BoardColumn[];

	@OneToMany((type) => Sprint, (sprint) => sprint.board)
	sprints?: Sprint[];

	@OneToMany((type) => Issue, (issue) => issue.board)
	issues?: Issue[];

	@ManyToOne((type) => UserProfile, (user) => user.boards, {
		onDelete: 'CASCADE',
	})
	@IsDefined()
	createdBy!: UserProfile;

	@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
	createdAt!: Date;

	@UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
	updatedAt!: Date;

	@ManyToMany((type) => Projects, (project) => project.boards, {
		cascade: true,
	})
	projects?: Projects[];
}
