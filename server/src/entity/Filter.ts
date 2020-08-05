import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { User } from './User';
@Entity()
export class Filter {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ManyToOne((type) => User, (user) => user.id)
	@Column()
	ownerId?: string;

	@Column()
	name?: string;

	@ManyToMany((type) => User, (user) => user.id)
	staredBy?: User[];
}
