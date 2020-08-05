import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User';
@Entity()
export class Filter {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ManyToOne((type) => User, (user) => user.filters)
	owner?: User;

	@Column({ nullable: false })
	ownerId?: string;

	@Column()
	name?: string;

	@ManyToMany((type) => User)
	@JoinTable()
	staredBy?: User[];
}
