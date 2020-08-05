import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
// import User from './User';
@Entity()
export class Filter {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	// @ManyToOne(type => User)
	@Column()
	ownerId?: string;

	@Column()
	name?: string;

	// @Column
	// staredBy?: User[]
}
